import Axios from "axios";

var callbackPublic;
var resultMap = new Map();
var googlePublic;
var typeArray = ["country", "countryCode", "administrativeArea", "locality"];
var requestMapPublic = new Map();

var LOCATION_CACHE = "IvyCustomer_location_cache";
export default function location(requestMap, callback, google, isRefresh) {
	googlePublic = google;
	callbackPublic = callback;
	requestMapPublic = requestMap;
	let needRelocation = false;

	if (isRefresh) {
		startLocation();
		return;
	}
	// 计算定位是否过时
	let duration = new Date().getTime() - localStorage.getItem(LOCATION_CACHE);
	if (requestMap.get("administrativeArea") || requestMap.get("locality")) {
		if (duration > 1000 * 60 * 60 * 8) {
			needRelocation = true;
		};
	}
	if (requestMap.get("country") || requestMap.get("countryCode")) {
		if (duration > 1000 * 60 * 60 * 24) {
			needRelocation = true;
		};
	}
	if (needRelocation) {
		startLocation();
		return;
	}
	// 遍历获取localStorage 是否有所需全部数据，无所需数据则重新定位
	for (let i = 0; i < typeArray.length; i++) {
		let type = typeArray[i];
		if (requestMap.get(type)) {
			let localStorageData = localStorage.getItem(`IvyCustomer_${type}`);
			if (localStorageData) {
				resultMap.set(type, localStorageData);
			} else {
				needRelocation = true;
				break;
			}
		}
	}
	if (needRelocation) {
		startLocation();
	} else {
		callbackPublic(resultMap, "");
	}
}

function startLocation() {
	// 一：获取经纬度
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getPosition, error => {
			callbackPublic(resultMap, "Geocode not Available");
		});
	} else {
		callbackPublic(resultMap, "Geocode not Available");
	}
}

function getPosition(position) {
	// 二：谷歌定位
	if (googlePublic) {
		var geocoder = new googlePublic.maps.Geocoder;
		geocoder.geocode(
			{
				'location': { lat: position.coords.latitude, lng: position.coords.longitude }
			},
			function (results, status) {
				if (status === 'OK') {
					let result;
					let maxLength = 0;
					for (let i = 0; i < results.length; i++) {
						if (results[i].address_components.length > maxLength) {
							result = results[i];
							maxLength = result.address_components.length;
						}
					}
					if (result) {
						let addressArray = results[0].address_components;
						let needIPLocation = false;
						for (let i = 0; i < addressArray.length; i++) {
							for (let j = 0; j < addressArray[i].types.length; j++) {
								if (addressArray[i].types[j] == "country") {
									resultMap.set("country", addressArray[i].long_name);
									resultMap.set("countryCode", addressArray[i].short_name);
									break;
								} else if (addressArray[i].types[j] == "administrative_area_level_1") {
									resultMap.set("administrativeArea", addressArray[i].short_name);
									break;
								} else if (addressArray[i].types[j] == "locality") {
									resultMap.set("locality", addressArray[i].short_name);
									break;
								}
							}
						}
						// 判断数据是否有缺失
						for (let i = 0; i < typeArray.length; i++) {
							let type = typeArray[i];
							if (requestMapPublic.get(type) && !resultMap.get(type)) {
								needIPLocation = true;
								break;
							}
						}
						if (needIPLocation) {
							startIPLocation();
						} else {
							setLocalStorage();
							callbackPublic(resultMap, "");
						}
					} else {
						startIPLocation();
					}
				} else {
					startIPLocation();
				}
			});
	} else {
		startIPLocation();
	}
}

function startIPLocation() {
	// 三 IP定位
	Axios.get("https://get.geojs.io/v1/ip/geo.json").then(result => {
		if (result.status == 200) {
			resultMap.set("country", result.data.country);
			resultMap.set("countryCode", result.data.country_code);
			resultMap.set("administrativeArea", result.data.region);
			resultMap.set("locality", result.data.city);
			setLocalStorage();
			callbackPublic(resultMap, "");
		} else {
			callbackPublic(resultMap, "Geocode not Available");
		}
	}, error => {
		callbackPublic(resultMap, "Geocode not Available");
	});
}

function setLocalStorage() {
	for (let i = 0; i < typeArray.length; i++) {
		let type = typeArray[i];
		localStorage.setItem(`IvyCustomer_${type}`, resultMap.get(type));
	}
	let date = new Date();
	localStorage.setItem(LOCATION_CACHE, date.getTime());
}
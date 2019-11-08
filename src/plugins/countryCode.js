export default function getLocationName(locality, administrativeArea, countryCode, country) {
	if (locality) {
		let areaCode = administrativeArea;
		if (countryCode == "US") {
			if (isNameMatch(countryCode, areaCode)) {
				if (isAvailable(true, locality + ", " + areaCode, b_cities)) {
					return {
						result: locality + ", " + areaCode,
						success: true
					};
				}
			} else {
				if (isAvailable(false, locality, b_cities)) {
					return {
						result: locality,
						success: true
					};
				}
			}
			return {
				result: locality,
				success: false
			};
		} else if (countryCode == "CA") {
			if (isNameMatch(countryCode, areaCode)) {
				if (isAvailable(true, locality + ", " + areaCode, b_cities)) {
					return {
						result: locality + ", " + areaCode,
						success: true
					};
				}
			} else {
				if (isAvailable(false, locality, b_cities)) {
					return {
						result: locality,
						success: true
					};
				}
			}
			return {
				result: locality,
				success: false
			};
		} else if (countryCode == "CN") {
			if (isAvailable(true, locality + ", " + countryCode, b_cities)) {
				return {
					result: locality + ", " + countryCode,
					success: true
				};
			}
			return {
				result: locality + ", " + countryCode,
				success: false
			};
		} else {
			if (isAvailable(true, locality + ", " + country, b_cities)) {
				return {
					result: locality + ", " + country,
					success: true
				};
			} else {
				return {
					result: locality + ", " + country,
					success: false
				};
			}
		}
	} else {
		return "";
	}
}

function isAvailable(isFullName, name, cityList) {
	for (let i = 0; i < cityList.length; i++) {
		if (isFullName) {
			if (cityList[i].toLowerCase() == name.toLowerCase()) {
				return true;
			}
		} else {
			let arr = cityList[i].split(",");
			if (arr[0].toLowerCase() == name.toLowerCase()) {
				return true;
			}
		}
	}
	return false;
}

function isNameMatch(countryCode, key) {
	let map;
	if (countryCode == ("US")) {
		map = initUSMap();
	} else if (countryCode == ("CA")) {
		map = initCAMap();
	}
	let valueArray = map.values();
	for (let value of valueArray) {
		if (key.toLowerCase() == value.toLowerCase()) {
			return true;
		}
	}
	return false;
}

function initUSMap() {
	let USMap = new Map();
	USMap.set("Alabama", "AL");
	USMap.set("Alaska", "AK");
	USMap.set("American Samoa (see also separate entry under AS)", "AS");
	USMap.set("Arizona", "AZ");
	USMap.set("Arkansas", "AR");
	USMap.set("California", "CA");
	USMap.set("Colorado", "CO");
	USMap.set("Connecticut", "CT");
	USMap.set("Delaware", "DE");
	USMap.set("District of Columbia", "DC");
	USMap.set("Florida", "FL");
	USMap.set("Georgia", "GA");
	USMap.set("Guam (see also separate entry under GU)", "GU");
	USMap.set("Hawaii", "HI");
	USMap.set("Idaho", "ID");
	USMap.set("Illinois", "IL");
	USMap.set("Indiana", "IN");
	USMap.set("Iowa", "IA");
	USMap.set("Kansas", "KS");
	USMap.set("Kentucky", "KY");
	USMap.set("Louisiana", "LA");
	USMap.set("Maine", "ME");
	USMap.set("Maryland", "MD");
	USMap.set("Massachusetts", "MA");
	USMap.set("Michigan", "MI");
	USMap.set("Minnesota", "MN");
	USMap.set("Mississippi", "MS");
	USMap.set("Missouri", "MO");
	USMap.set("Montana", "MT");
	USMap.set("Nebraska", "NE");
	USMap.set("Nevada", "NV");
	USMap.set("New Hampshire", "NH");
	USMap.set("New Jersey", "NJ");
	USMap.set("New Mexico", "NM");
	USMap.set("New York", "NY");
	USMap.set("North Carolina", "NC");
	USMap.set("North Dakota", "ND");
	USMap.set("Northern Mariana Islands (see also separate entry under MP)", "MP");
	USMap.set("Ohio", "OH");
	USMap.set("Oklahoma", "OK");
	USMap.set("Oregon", "OR");
	USMap.set("Pennsylvania", "PA");
	USMap.set("Puerto Rico (see also separate entry under PR)", "PR");
	USMap.set("Rhode Island", "RI");
	USMap.set("South Carolina", "SC");
	USMap.set("South Dakota", "SD");
	USMap.set("Tennessee", "TN");
	USMap.set("Texas", "TX");
	USMap.set("United States Minor Outlying Islands (see also separate entry under UM)", "UM");
	USMap.set("Utah", "UT");
	USMap.set("Vermont", "VT");
	USMap.set("Virgin Islands, U.S. (see also separate entry under VI)", "VI");
	USMap.set("Virginia", "VA");
	USMap.set("Washington", "WA");
	USMap.set("West Virginia", "WV");
	USMap.set("Wisconsin", "WI");
	USMap.set("Wyoming", "WY");
	return USMap;
}

function initCAMap() {
	let CAMap = new Map();
	CAMap.set("Alberta", "AB");
	CAMap.set("British Columbia", "BC");
	CAMap.set("Manitoba", "MB");
	CAMap.set("New Brunswick", "NB");
	CAMap.set("Newfoundland and Labrador", "NL");
	CAMap.set("Northwest Territories", "NT");
	CAMap.set("Nova Scotia", "NS");
	CAMap.set("Nunavut", "NU");
	CAMap.set("Ontario", "ON");
	CAMap.set("Prince Edward Island", "PE");
	CAMap.set("Quebec", "QC");
	CAMap.set("Saskatchewan", "SK");
	CAMap.set("Yukon Territory", "YT");
	return CAMap;
}
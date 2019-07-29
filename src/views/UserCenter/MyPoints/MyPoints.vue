<template>
    <div class="my-points">
      <el-container>
        <el-header height="33px">
          <item-header :status="status" :headerInfo="headerInfo"></item-header>
        </el-header>
        <el-main>
          <div class="content">
            <div class="brief">
              <div class="brief-left">
                <div class="brief-left-up">Avaliable Points</div>
                <div class="brief-left-middle">
                  <img src="./img/points.png">
                </div>
                <div class="brief-left-down">9</div>
              </div>
              <div class="brief-right">
                <div class="brief-right-item">
                  <h4>Booking</h4>
                  <p>0</p>
                </div>
                <div class="brief-right-item">
                  <h4>Pending Points</h4>
                  <p>5</p>
                </div>
                <div class="brief-right-item">
                  <h4>Survey</h4>
                  <p>0</p>
                </div>
                <div class="brief-right-item">
                  <h4>Reviews</h4>
                  <p>2</p>
                </div>
                <div class="brief-right-item">
                  <h4>Other</h4>
                  <p>0</p>
                </div>
                <div class="brief-right-item help">
                  Points Help &nbsp;>>
                </div>
              </div>
            </div>
            <div class="detail">
              <h2 class="table-title">Points Details</h2>
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="source"
                  label="Source"
                  min-width="206px">
                </el-table-column>
                <el-table-column
                  prop="points"
                  label="Points"
                  min-width="62px">
                </el-table-column>
                <el-table-column
                  prop="date"
                  label="Date"
                  min-width="130px">
                </el-table-column>
              </el-table>
              <div class="pagination-wrapper">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="100">
                </el-pagination>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
</template>

<script>
  import ItemHeader from '@/views/UserCenter/ItemHeader'
  export default {
    data() {
      return {
        status: 0,
        headerInfo: [
          [''],
          { description: 'My Points', path: '/app/member/account/points' }
        ],
        tableData: [{
          source: 'Booking ( Order JT23-600-3427 )',
          points: '+ 7',
          date: '2019-07-23 23:56:08'
        }, {
          source: 'Booking ( Order JT23-600-3427 )',
          points: '- 12',
          date: '2019-07-23 23:56:08'
        }, {
          source: 'Booking ( Order JT23-600-3427 )',
          points: '+ 7',
          date: '2019-07-23 23:56:08'
        }]
      }
    },
    components: {
      ItemHeader
    },
    name: 'MyPoints'
  }
</script>

<style scoped>
  .my-points {
    flex: 1;
  }
  .content {
    padding-top: 4px;
  }
  .brief {
    width: 980px;
    height: 200px;
    box-sizing: border-box;
    border: 1px solid #E9F1FA;
    padding: 26px 90px;
    display: flex;
    align-items: stretch;
  }
  .brief>.brief-left {
    width: 280px;
    display: flex;
    flex-direction: column;
  }
  .brief>.brief-left>.brief-left-up {
    line-height: 1;
    font-size: 20px;
    text-align: center;
    margin-bottom: 10px;
  }
  .brief>.brief-left>.brief-left-middle {
    text-align: center;
    margin-bottom: 10px;
    border-right: 4px solid #F6F8FB;
  }
  .brief>.brief-left>.brief-left-down {
    text-align: center;
    font-size: 30px;
    line-height: 1;
    font-weight: bold;
    color: #365C86;
  }
  .brief>.brief-right {
    flex: 1 1;
    padding-left: 40px;
    padding-top: 15px;
    display: flex;
    flex-wrap: wrap;
  }
  .brief>.brief-right>.brief-right-item {
    width: 33.333%;
    margin-bottom: 12px;
  }
  .brief>.brief-right>.brief-right-item>h4 {
    font-size: 16px;
    line-height: 16px;
    margin-top: 0;
    margin-bottom: 8px;
    color: #999999;
    text-align: center;
    font-weight: normal;
  }
  .brief>.brief-right>.brief-right-item>p {
    font-size: 18px;
    text-align: center;
    color: #666666;
    margin: 0;
  }
  .help {
    color: #274F7C;
    font-weight: bold;
    line-height: 53px;
    text-align: center;
  }
  .detail {
    margin-top: 20px;
  }
  .detail>.table-title {
    font-size: 20px;
    margin: 0;
    line-height: 1;
  }
  .pagination-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 15px;
  }
</style>

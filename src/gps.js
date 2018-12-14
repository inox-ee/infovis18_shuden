// GeoLocation APIに対応しているかの判定
function gpsSearch() {
  // 対応している場合
  if( navigator.geolocation )
  {
    navigator.geolocation.getCurrentPosition(

      function( position )
      {
        var data = position.coords
        var lat = data.latitude
        var lng = data.longitude
        var alt = data.altitude
        var accLatlng = data.accuracy
        var accAlt = data.altitudeAccuracy
        var heading = data.heading 			//0=北,90=東,180=南,270=西
        var speed = data.speed

        // 緯度経度から最寄り駅を検索するapi
        var url = `https://express.heartrails.com/api/json?method=getStations&x=${lng}&y=${lat}`
        $.ajax({
          type: 'GET',
          url: url,
          dataType: 'jsonp',
          success: function(json){
            document.getElementById("moyori").style.display = "inherit"
            document.getElementById('moyori').innerHTML = '最寄駅　1. ' + json.response.station[0].name
            if (json.response.station[0].name === json.response.station[1].name) {
              document.getElementById('moyori').innerHTML += ' / 2. ' + json.response.station[2].name
            } else {
              document.getElementById('moyori').innerHTML += ' / 2. ' + json.response.station[1].name
            }
          }
        })
      },

      function( error )
      {
        // エラーコード(error.code)の番号
        // 0:UNKNOWN_ERROR				原因不明のエラー
        // 1:PERMISSION_DENIED			利用者が位置情報の取得を許可しなかった
        // 2:POSITION_UNAVAILABLE		電波状況などで位置情報が取得できなかった
        // 3:TIMEOUT					位置情報の取得に時間がかかり過ぎた…

        // エラー番号に対応したメッセージ
        var errorInfo = [
          "原因不明のエラーが発生しました" ,
          "位置情報の取得が許可されませんでした" ,
          "電波状況などで位置情報が取得できませんでした" ,
          "位置情報の取得に時間がかかり過ぎてタイムアウトしました"
        ]

        var errorNo = error.code
        var errorMessage = "[エラー番号: " + errorNo + "]\n" + errorInfo[ errorNo ]
        alert( errorMessage )
      } ,

      {
        "enableHighAccuracy": false,
        "timeout": 8000,
        "maximumAge": 2000,
      }

    )
  }

  // 対応していない場合
  else
  {
    var errorMessage = "お使いの端末は、GeoLacation APIに対応していません。"
    alert( errorMessage )
  }
}

import {LightningElement} from 'lwc';
import logoURL from '@salesforce/resourceUrl/weatherLogo';
import getWeatherDetails from '@salesforce/apex/SF_weatherAPI.getWeatherDetails';
export default class WeatherForecast extends LightningElement {
    cityName;
    aqiCheck;
    appLogo=logoURL+'/appLogo/images/weatherApp.png';
    weatherSuccess=false;
    weatherFail=false;
    climateImg;
    wantAqi='No';
    cityTitle;
    areaCity;
    areaRegion;
    areaCountry;
    timeZone;
    tempInCelcius;
    errorCatcher;
    humid;
    windDir;
    co2;
    o3;
    so2;
    no2;
    windSpeed;
    createdBy=logoURL+'/appLogo/images/byYSN.png';;
    getWeatherDe(event){
        getWeatherDetails({cityName:this.cityName,aqiC:this.wantAqi}).then(result=>{
          this.cityTitle='Current Climate of '+ this.cityName+' :';
          const climate=JSON.parse(result);
          console.log('inside '+this.wantAqi);
            if(this.wantAqi==='Yes'){
                this.co2=climate.current.air_quality.co;
                this.o3=climate.current.air_quality.o3;
                this.so2=climate.current.air_quality.so2;
                this.no2=climate.current.air_quality.no2;
                this.aqiCheck=true;
            }
            else{
                this.aqiCheck=false;
            }
            this.areaCity=climate.location.name;
            this.areaRegion=climate.location.region;
            this.areaCountry=climate.location.country;
            this.timeZone=climate.location.tz_id;
            this.tempInCelcius=climate.current.temp_c+' °C';
            this.humid=climate.current.humidity+'%';
            this.windDir=climate.current.wind_dir;
            this.windSpeed=climate.current.wind_kph+' KMPH';
            this.climateImg=climate.current.condition.icon;
            this.climateName=climate.current.condition.text;
            console.log(result);
            this.weatherSuccess=true;
            this.weatherFail=false;
        }).catch(error=>{
            this.weatherSuccess=false;
            this.weatherFail=true;
            this.errorCatcher='Cannot Find this City/Town/Area, Please Try Again!';
        })
    }
    cityN(event){
        this.cityName=event.target.value;
}
handleToggle(event){
    if(event.target.checked){
        console.log('if true');
        this.wantAqi='Yes';
    }
    else{
        console.log('else false');
        this.wantAqi='No';
    }
}
}
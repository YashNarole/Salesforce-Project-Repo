public with sharing class SF_weatherAPI {
	@AuraEnabled
    public static string getWeatherDetails(string cityName,string aqiC){
        final string weatherEndpoint='http://api.weatherapi.com/';
		final string apiKey='b43dafbbc61d481b86d133458241410';
        Http http = new Http();
	  	HttpRequest request = new HttpRequest();
	  	request.setEndpoint(weatherEndpoint+'v1/current.json?key='+apiKey+'&q='+cityName+'&aqi='+aqiC);
	  	request.setMethod('GET');
	  	HttpResponse response = http.send(request);
        if(response.getStatusCode() == 200) {
    	system.debug('Successful Callout!'+response.getStatusCode());
        system.debug('response: '+response);
    	system.debug(response.getBody());
            return response.getBody();
										}
        else{
        return response.getBody();
    }
    }
}
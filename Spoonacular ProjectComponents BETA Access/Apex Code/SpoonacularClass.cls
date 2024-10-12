public class SpoonacularClass {
	private static string spoonEndpoint='https://api.spoonacular.com/';
    private static string apiKey='ee086b3f12cb4b4391a1da089bb771e3';
    @AuraEnabled(cacheable=true)
    public static Map<String,Object> getRandomReceipe(){
      Http http = new Http();
	  HttpRequest request = new HttpRequest();
	  request.setEndpoint(spoonEndpoint+'recipes/random?apiKey='+apiKey);
	  request.setMethod('GET');
	  HttpResponse response = http.send(request);
        Map<String,Object>respBody=new Map<String,Object>(); 
	// If the request is successful, parse the JSON response.			
	if(response.getStatusCode() == 200) {
    system.debug('Successful Callout!'+response.getStatusCode());
    system.debug(response.getBody());
    respBody=(Map<String,Object>)JSON.deserializeUntyped(response.getBody());
        
										}
        return respBody;
    }
    @AuraEnabled(cacheable=true)
    public static List<Object> getReceipeByID(string recipeId){
      Http http = new Http();
	  HttpRequest request = new HttpRequest();
	  request.setEndpoint(spoonEndpoint+'/recipes/'+recipeId+'/information?apiKey='+apiKey);
	  request.setMethod('GET');
	  HttpResponse response = http.send(request);
	// If the request is successful, parse the JSON response.			
		if(response.getStatusCode() == 200) {
    		system.debug('Successful Callout!'+response.getStatusCode());
    		system.debug(response.getBody());
    		Map<String,Object>respBody=(Map<String,Object>)JSON.deserializeUntyped(response.getBody());
   			 system.debug('title: '+respBody.get('title'));
    		system.debug('healthScore: '+respBody.get('healthScore'));
        			return new List<Object>{respBody.get('title'),respBody.get('healthScore'),respBody.get('image'),respBody.get('sourceUrl'),respBody.get('summary')};
										}
        return null;
    }
    @AuraEnabled(cacheable=true)
    public static String getReceipeByIngredient(string ingredient){
      Http http = new Http();
	  HttpRequest request = new HttpRequest();
	  request.setEndpoint(spoonEndpoint+'/recipes/findByIngredients?ingredients='+ingredient+'&number=3&apiKey='+apiKey);
	  request.setMethod('GET');
	  HttpResponse response = http.send(request);
	// If the request is successful, parse the JSON response.			
		if(response.getStatusCode() == 200) {
    		system.debug('Successful Callout!'+response.getStatusCode());
    		system.debug(response.getBody());
        			return response.getBody();
										}
        return null;
    }
    public static string getNutrition(string foodName){
          Http http = new Http();
    	  HttpRequest request = new HttpRequest();
	  //request.setEndpoint(spoonEndpoint+'/recipes/findByIngredients?ingredients='+foodName+'&number=10&apiKey='+apiKey);
	  	 request.setEndpoint(spoonEndpoint+'/recipes/guessNutrition?title='+foodName+'&apiKey='+apiKey);
		 request.setMethod('GET');
	     HttpResponse response = http.send(request);
        // If the request is successful, parse the JSON response.			
		if(response.getStatusCode() == 200) {
    		system.debug('Successful Callout!'+response.getStatusCode());
    		system.debug(response.getBody());
        			return response.getBody();
										}
        return null;
    }
}
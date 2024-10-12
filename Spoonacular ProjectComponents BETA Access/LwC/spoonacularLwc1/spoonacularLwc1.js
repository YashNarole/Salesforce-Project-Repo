import { LightningElement,api } from 'lwc';
//import getRandomReceipe from '@salesforce/apex/SpoonacularClass.getRandomReceipe';
//import FOOD_IMG from "@salesforce/resourceURL/foodEngine";
//import getReceipeOnId from '@salesforce/apex/SpoonacularClass.getReceipeByIngredient';
import getReceipeOnIngredient from '@salesforce/apex/SpoonacularClass.getReceipeByIngredient';
export default class SpoonacularLwc1 extends LightningElement {
    enterIngre='';
    reciepeName2;
    reciepeName3;
    reciepeName;
    imgURL;
    imgURL3;
    imgURL2;
    summary1;
    summary2;
    summary3;
    typeSobject;
    servings;
    timeRequired;
    noMatch=false;
    fetchReciepe=false;
    updateId(event){
        this.enterIngre=event.target.value;
    }
    handleIngredient(){
        getReceipeOnIngredient({ingredient:this.enterIngre}).then(result=>{
          const reciepe=JSON.parse(result);
            this.imgURL= reciepe[0].image;
            this.reciepeName=reciepe[0].title;
            console.log('x-xx--x');
            console.log(reciepe[0].aisle);
            this.summary1=reciepe[0].id;

            this.imgURL2= reciepe[1].image;
            this.reciepeName2=reciepe[1].title;
            this.summary2=reciepe[1].id;
            
            this.imgURL3= reciepe[2].image;
            this.reciepeName3=reciepe[2].title;
            this.summary3=reciepe[2].id;
            
            this.fetchReciepe=true;
            this.noMatch=false;
        })
        .catch(
            error=>{
                this.fetchReciepe=false;
                this.noMatch=true;
                console.error(error);
            }
        )
    // handleReceipeId(){
    //     console.log('inside handler method');
    //     getReceipeOnId({ recipeId: this.enterId }).then(
    //         result=>{
    //             console.log('inside "then" promise');
    //                 console.log(result);
    //                 console.log(result[0]+ typeof (result[0]));
    //                 console.log(result[1]+ typeof (result[1]));
    //                 console.log(result[2]+ typeof (result[2]));
    //                 console.log(result[3]+ typeof (result[3]));
    //                 this.reciepeName=result[0];
    //                 this.imgURL=result[2];
    //                 this.summary=result[4];
    //                 this.fetchReciepe=true;
                
    //         }
    //     ).catch(
    //         error=>{
    //             this.fetchReciepe=false;
    //             console.error(error);
    //         }
    //     )
    // }

}}
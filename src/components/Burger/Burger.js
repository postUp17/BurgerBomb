import React from 'react'

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) =>{
    let transformedIngredients = Object.keys(props.ingredients) //["salad", "bacon", "cheese", "meat"]
        .map( igKey => {
            return [...Array(props.ingredients[igKey])]   //[Array(1), Array(1), Array(2), Array(2)]
            .map((_,i)=>{
                return <BurgerIngredient key={igKey + i} type ={igKey}/>
            }) //[Array(1), Array(1), Array(2), Array(2)]
        })
        .reduce((arr,el) => {
            return arr.concat(el)
        },[])
    if (transformedIngredients.length===0){
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
       // console.log(transformedIngredients)
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
}
            
export default burger
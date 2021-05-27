import React, { Component } from 'react'
import { connect } from 'react-redux'


import Aux from '../../hoc//Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'

export class BurgerBuilder extends Component {
    state = {
        // ingredients: null,
        // totalPrice: 4,
        // purchasable: false,
        purchasing: false
      
    }

    componentDidMount() {
        this.props.onInitIngredients()
    //     axios.get('https://my-burgur.firebaseio.com/ingredients.json')
    //         .then(response => {
    //             this.setState({ ingredients: response.data })
    //         })
    //         .catch(error => {
    //             this.setState({error: true})
    //         })
    }

    updatePuchaseState(ingredients) {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
       return  sum > 0 

    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({ purchasing: true })
        }else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
       
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase()
       
    //    const queryParams =[]
    //    for(let i in this.state.ingredients){
    //        queryParams.push(encodeURIComponent(i)+
    //        '='+encodeURIComponent(this.state.ingredients[i]))
    //    }
    //    queryParams.push('price='+this.state.totalPrice)
    //    const queryString = queryParams.join('&')
       this.props.history.push('/checkOut')
       //checkOut?bacon=1&cheese=2&meat=2&salad=3
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type]
    //     const updatedCount = oldCount + 1
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount

    //     const priceAddition = INGREDIENT_PRICES[type]
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = oldPrice + priceAddition
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     })
    //     this.updatePuchaseState(updatedIngredients)
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type]
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount

    //     const priceDeduction = INGREDIENT_PRICES[type]
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = oldPrice - priceDeduction
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     })
    //     this.updatePuchaseState(updatedIngredients)
    // }


    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null

       
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> :<Spinner />
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePuchaseState(this.props.ings)}
                        ordered={this.purchaseHandler} 
                        isAuth = {this.props.isAuthenticated}/>
                </Aux>
            )
            orderSummary = <OrderSummary
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.props.ings}
                price={this.props.price} />
        }
        // if (this.state.loading) {
        //     orderSummary = <Spinner />
        // }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </Aux>
        )
    }
}

const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error,
        isAuthenticated : state.auth.token

    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded: (ingName)=>dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName)=>dispatch(actions.removeIngredient(ingName)),
        onInitIngredients :() => dispatch(actions.initIngredients()),
        onInitPurchase: ()=>dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath : (path)=>dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios) )
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary'
import ContactData from './ContactData/ContactData'

class CheckOut extends Component {

   
    // state = {
    //     ingredients:null,
    //     totalPrice:0
    // }

    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search)
    //    // console.log(query)
    //     const ingredients = {}
    //     let price = 0
    //     for (let param of query.entries()) {
    //         //['salad','1']
    //         if(param[0]==='price'){
    //             price = param[1]
    //         }else{
    //             ingredients[param[0]] = +param[1]
    //         }
    //     }
    //     this.setState({ ingredients: ingredients , totalPrice:price})
    // }

    checkOutCancelled = () => {
        this.props.history.goBack()
    }

    checkOutContinued = () => {
        this.props.history.replace('/checkOut/contact-data')
    }
    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/>:null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckOutSummary
                        ingredients={this.props.ings}
                        checkOutCancelled={this.checkOutCancelled}
                        checkOutContinued={this.checkOutContinued} />
                    <Route path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            )
        }
        return summary    
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}




export default connect(mapStateToProps)(CheckOut) 
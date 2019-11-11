import React from "react";
// import ReactDOM from "react-dom";

import ProductListItem from "./product-list-item";
import { Grid, Card, Dimmer, Loader, Menu, Input } from "semantic-ui-react";
import { connect } from "react-redux";

import fetchApi from "../../modules/fetch-api";

class ProductListing extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    const { loadProducts } = this.props;
    // fetchApi("get", "http://localhost:3000/api/v1/products").then(json => {
    fetchApi(
      "get",
      "https://cors-anywhere.herokuapp.com/https://grocery-delivery-backend.herokuapp.com/api/v1/products"
    ).then(json => {
      loadProducts(json);
      //console.log("Products loaded:", json);
      this.setState({
        loading: false,
        products: this.props.products,
        filteredProducts: []
      });
    });
  }

  handleItemClickAll = name => {
    this.setState({ activeItem: name, filteredProducts: this.props.products });
  };

  handleItemClickFruitsAndVegetables = name => {
    const filtered = this.state.products.filter(
      product => product.category === "Fruits & Vegetables"
    );
    this.setState({ activeItem: name, filteredProducts: filtered });
  };

  handleItemClickBeverages = name => {
    const filtered = this.state.products.filter(
      product => product.category === "Beverages"
    );
    this.setState({ activeItem: name, filteredProducts: filtered });
  };

  handleItemClickBakeryAndBread = name => {
    const filtered = this.state.products.filter(
      product => product.category === "Bakery & Bread"
    );
    this.setState({ activeItem: name, filteredProducts: filtered });
  };

  handleItemClickDairyAndEggs = name => {
    const filtered = this.state.products.filter(
      product => product.category === "Dairy & Eggs"
    );
    this.setState({ activeItem: name, filteredProducts: filtered });
  };

  handleItemClickFrozenFoods = name => {
    const filtered = this.state.products.filter(
      product => product.category === "Frozen Food"
    );
    this.setState({ activeItem: name, filteredProducts: filtered });
  };

  handleItemClickPantry = name => {
    const filtered = this.state.products.filter(
      product => product.category === "Pantry"
    );
    this.setState({ activeItem: name, filteredProducts: filtered });
  };

  render() {
    const { addToCart, removeFromCart, products, cart } = this.props;
    const { activeItem } = this.state;
    console.log("Home State: ", this.state);
    return (
      <div>
        {this.state.loading ? (
          <div>
            <Dimmer active>
              <Loader size="massive">Loading</Loader>
            </Dimmer>
          </div>
        ) : (
          <Grid>
            <Grid.Column width={3}>
              <Menu vertical>
                <Menu.Item>
                  <Input placeholder="Search..." />
                </Menu.Item>
                <Menu.Item>
                  <Menu.Header>Products</Menu.Header>

                  <Menu.Menu>
                    <Menu.Item
                      name="All"
                      active={activeItem === "All"}
                      onClick={this.handleItemClickAll}
                    />
                    <Menu.Item
                      name="Fruits and Vegetables"
                      active={activeItem === "Fruits and Vegetables"}
                      onClick={this.handleItemClickFruitsAndVegetables}
                    />
                    <Menu.Item
                      name="Beverages"
                      active={activeItem === "Beverages"}
                      onClick={this.handleItemClickBeverages}
                    />
                    <Menu.Item
                      name="Bakery and Bread"
                      active={activeItem === "Bakery and Bread"}
                      onClick={this.handleItemClickBakeryAndBread}
                    />
                    <Menu.Item
                      name="Dairy and Eggs"
                      active={activeItem === "Dairy and Eggs"}
                      onClick={this.handleItemClickDairyAndEggs}
                    />
                    <Menu.Item
                      name="Frozen Foods"
                      active={activeItem === "Frozen Foods"}
                      onClick={this.handleItemClickFrozenFoods}
                    />
                    <Menu.Item
                      name="Pantry"
                      active={activeItem === "Pantry"}
                      onClick={this.handleItemClickPantry}
                    />
                  </Menu.Menu>
                </Menu.Item>
              </Menu>
            </Grid.Column>
            <Grid.Column width={13}>
              <Card.Group>
                {this.state.filteredProducts.length === 0
                  ? products.map(product => (
                      <ProductListItem
                        key={product.id}
                        product={product}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                        cartItem={
                          cart.filter(cartItem => cartItem.id === product.id)[0]
                        }
                      />
                    ))
                  : this.state.filteredProducts.map(product => (
                      <ProductListItem
                        key={product.id}
                        product={product}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                        cartItem={
                          cart.filter(cartItem => cartItem.id === product.id)[0]
                        }
                      />
                    ))}
              </Card.Group>
            </Grid.Column>
          </Grid>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
    products: state.products
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadProducts: products => {
      dispatch({ type: "LOAD", payload: products });
    },
    addToCart: item => {
      dispatch({ type: "ADD", payload: item });
    },
    removeFromCart: item => {
      dispatch({ type: "REMOVE", payload: item });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListing);

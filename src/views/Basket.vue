<template>
  <div class="basket">
    <div class="items">

    <template v-if="this.cart.length">
        <div class="item" v-for="(item, index) in this.cart" :key="index">
        <div class="remove" @click="this.$store.dispatch('removeToBag', item.id)">Remover Produto</div>
        <div class="photo"><img :src="item.image" :alt="item.title"></div>
        <div class="description">{{item.title}}</div>
        <div class="price">
          <span class="quantity-area">
            <button :disabled="item.quantity <= 1" @click="item.quantity--">-</button>
            <span class="quantity">{{item.quantity}}</span>
            <button  @click="item.quantity++">+</button>
          </span>
          <span class="amount">R$ {{(item.price * item.quantity).toFixed(2)}}</span>
        </div>
      </div>
      <div class="grand-total"> Total do pedido: R$ {{orderTotal()}}</div>

    </template>
    <template v-else><h4>Sem itens no carrinho</h4></template>

    </div>
  </div>
</template>

<script>

export default {
  name: 'Basket',

  computed: {
    cart (){
      return this.$store.state.cart;
    }
  },  

  methods: {
    orderTotal(){
      var total = 0;
      this.cart.forEach(element => {
        total += element.price * element.quantity;
      });

      return total;
    }
  },
 
}
</script>

<style lang="scss">

.basket {
  padding: 60px 0;  
  .items {
    max-width: 800px;
    margin: auto;
    .item {
      display: flex;
      justify-content: space-between;
      padding: 40px 0;
      border-bottom: 1px solid lightgrey;
      position: relative;

      .remove {
        position: absolute;
        top: 8px;
        right: 0;
        font-size: 11px;
        text-decoration: underline;
        cursor: pointer;
      }

      .quantity-area {
        margin: 8px auto;
        height: 14px;

        button {
          width: 16px;
          height: 16px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }

        .quantity {

            margin: 0 4px;
        }
      }

      .photo {
        img {
          max-width: 80px;
        }
      }

      .description {
        padding-left: 30px;
        box-sizing: border-box;
        max-width: 50%;

      }

      .price {
        .amount {
          font-size: 16px;
          margin-left: 8px;
          vertical-align: middle;

        }
      }
    }
      .grand-total {
          font-size: 24px;
          font-weight: bold;
          text-align: right;
          margin-top: 8px;
      }

  }

}

</style>

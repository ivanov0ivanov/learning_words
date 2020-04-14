<template>
    <main class="container">
        <div class="search">
            <label class="search-label" for="search"> </label>
            <input class="search-input" id="search" type="search" v-model="inputForm">
        </div>
        <ul class="word-list">
            <li v-for="(itm, i) in wordList" :key="itm+i" :class="`word-list_item word-list_item-${i+1}`">
                <div class="lang eng">{{itm.eng}}</div>
                <span class="arrow">→</span>
                <div class="lang ru">{{itm.ru}}</div>
            </li>
        </ul>
        <ul class="menu">
            <li v-for="(itm, i) in buttons" :key="itm+i" :class="`menu_item menu_item-${i+1}`">
                <button :class="`menu_item_btn menu_item_btn${i+1}`" @click="isButton(i+1)">{{itm}}</button>
            </li>
        </ul>
    </main>
</template>

<script>
    import {TimelineMax} from "gsap";

    export default {
        name: 'Home',
        components: {},
        data() {
            return {
                buttons: [
                    "Find",
                    "Add",
                    "Edit",
                    "Delete"
                ],

                wordList: [
                    {
                        eng: "Hello",
                        ru: 'Привет'
                    },
                    {
                        eng: "Pharmacy",
                        ru: 'Аптека'
                    },
                    {
                        eng: "Pharmacology",
                        ru: 'Фармакология'
                    }
                ],

                isInput: false,
                inputForm: ''
            }
        },

        watch: {},

        methods: {
            isButton(i) {
                if (i <= 2) {
                    const input =  document.querySelector('.search-input');
                    const tl = new TimelineMax({onComplete:()=>{input.focus()}});

                    this.isInput = !this.isInput;
                    if (this.isInput) tl.to('.search-input', {opacity:1, height:50});
                    else {
                        tl.to('.search-input', {opacity:0, height:0});
                        this.inputForm = '';
                    }
                }
            }
        },

        mounted() {

        }
    }
</script>

<style lang="scss" scoped>

    .menu {
        position: absolute;
        bottom: 0;
        display: flex;
        width: 100%;

        &_item {
            width: 100%;
            height: 50px;

            &_btn {
                width: 100%;
                height: 50px;
                background: #ffffff;
                border: 1px solid;
                border-right: none;
                font-family: 'Diaria Sans Pro', serif;
            }
        }
    }

    .search {
        width: 100%;

        &-input {
            width: 100%;
            height: 0;
            color: #242020cf;
            font-size: 18px;
            font-weight: 500;
            padding: 5px;
            opacity: 0;
            border: none;
            border-bottom: 1px solid;
            border-radius: 0;
            -webkit-appearance: none;
        }
    }

    .word-list {
        width: 100%;

        &_item {
            display: flex;
            width: 100%;
            height: 60px;

            border-bottom: 1px solid;
            font-size: 28px;
            font-weight: 500;
            overflow: scroll;

            .lang {
                //width: 100%;
                height: 100%;
                display: flex;
                justify-content: start;
                align-items: center;
                color: #242020cf;
                padding: 10px;

                &.ru {
                    color: lighten(#242020cf, 30%);
                }
            }

            .arrow {
                display: flex;
                align-items: center;
                justify-content: start;
                width: 30px;
                height: 100%;
            }
        }
    }

    @media (max-width: 768px) and (orientation: portrait) {
        .container {

        }
    }
</style>

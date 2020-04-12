<template>
    <div class="container">
        <transition name="fade">
            <div v-if="isActive !== null"  class="input-container">
                <div v-if="isActive === 0" class="search">
                    <label class="search-label" for="search">Search Word</label>
                    <input class="search-input" type="text" id="search" v-model="input">
                    <button class="search-btn">Find<span style="font-size: 22px; font-style: italic">{{input ? ': '+input : ''}}</span></button>
                </div>

                <div v-if="isActive === 1" class="add">
                    <label class="add-label" for="add">Add Word</label>
                    <input class="add-input" type="text" id="add" v-model="input">
                    <button class="add-btn">Add<span style="font-size: 22px; font-style: italic">{{input ? ': '+input : ''}}</span></button>
                </div>
            </div>
        </transition>
        <div class="menu">
            <ul class="menu-items">
                <li v-for="(itm, i) in btns" :key="itm+i" :class="`menu-itm menu-itm-${i+1}`">
                    <button :class="`menu-itm-btn menu-itm-btn-${i+1}`" @touchend="isActive = i">{{itm}}</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {TimelineMax} from "gsap";

    export default {
        name: 'Home',
        components: {},
        data() {
            return {
                btns: [
                    "Find Word",
                    "Add Word"
                ],
                isActive: null,
                input: ""
            }
        },

        watch: {
            isActive (val) {
                this.input = "";
            }
        },

        methods: {

        },

        mounted() {

        }
    }
</script>

<style lang="scss" scoped>
    .container {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    .input-container {
        /*display: flex;*/
        /*justify-content: center;*/
        text-align: center;
    }
    .search {
        display: flex;
        flex-direction: column;
        width: 500px;

        &-label {
            display: block;
            font-size: 2em;
            margin-top: 30px;
            margin-bottom: 15px;
            color: blue;
        }

        &-input {
            width: 500px;
            font-size: 1.5em;
            margin: 1px;
            padding: 10px;
        }

        &-btn {
            max-width: 500px;
            width: 200px;
            margin: 20px auto;
            padding: 15px;
            background-color: #ffffff;
            border: 1px solid;
            border-radius: 5px;
            font-size: 1.5em;
        }
    }

    .add {
        display: flex;
        flex-direction: column;
        width: 500px;

        &-label {
            display: block;
            font-size: 2em;
            margin-top: 30px;
            margin-bottom: 15px;
            color: blue;
        }

        &-input {
            width: 500px;
            font-size: 1.5em;
            margin: 1px;
            padding: 10px;
        }

        &-btn {
            max-width: 500px;
            width: 200px;
            margin: 20px auto;
            padding: 15px;
            background-color: #ffffff;
            border: 1px solid;
            border-radius: 5px;
            font-size: 1.5em;
        }
    }

    .menu {
        &-items {
            margin: 0 10px;
        }

        &-itm {
            margin: 30px auto 20px;
            &-btn {
                max-width: 500px;
                width: 200px;

                padding: 15px;
                background-color: #ffffff;
                border: 1px solid;
                border-radius: 5px;
                font-size: 1.5em;
            }
        }
    }

    @media (max-width: 768px) and (orientation: portrait){
        .container {

        }
    }
</style>

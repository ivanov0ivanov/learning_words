<template>
    <main class="container" v-touch:swipe="swipeHandler">
        <div class="search">
            <label class="search-label" for="search"> </label>
            <input class="search-input" id="search" type="search" placeholder="Search" v-model="searchForm">
        </div>
        <ul class="word-list">
            <transition-group name="fade">
                <li v-for="(itm, i) in wordList" :key="itm+i" :class="`word-list_item word-list_item-${i+1}`">
                    <div class="lang eng">{{itm.eng}}</div>
                    <span class="arrow">→</span>
                    <div class="lang ru">{{itm.ru}}</div>
                </li>
            </transition-group>
            <li class="word-list_item add-input">
                <label for="add"> </label>
                <input id="add" :class="['lang', {'ph-color': (currLang.eng || currLang.ru)}]" type="text" :placeholder="(!currLang.eng && !currLang.ru) ? 'Enter some word' : 'Enter translation'" v-model="addForm">
            </li>
        </ul>
        <ul class="menu">
            <li v-for="(itm, i) in isButtons" :key="itm+i" :class="`menu_item menu_item-${i+1}`">
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

                isSearch: false,
                searchForm: '',
                isAdd: false,
                addForm: '',
                currLang: {
                    eng: '',
                    ru: ''
                }
            }
        },

        computed: {
          isButtons () {
              return [
                  !this.searchForm ? "Search" : "Find?",
                  !this.addForm ? "Add" : "Save?",
                  "Edit",
                  "Delete"
              ]
          }
        },

        watch: {
            addForm(val) {
                this.$nextTick(()=>{
                    const tl = new TimelineMax();
                    if (val) tl.to('.menu_item_btn2', .3, {color: '#ffffff', backgroundColor: '#67b267'})
                })
            }
        },

        methods: {
            swipeHandler(to) {
                const tl = new TimelineMax();
                if (to === 'left') tl.staggerTo(['.lang.ru', '.arrow'], .3, {opacity: 0}, .1);
                if (to === 'right') tl.staggerTo(['.arrow', '.lang.ru'], .3, {opacity: 1}, .1);
            },

            isButton(i) {
                if (i === 1) {
                    const input =  document.querySelector('.search-input');
                    const tl = new TimelineMax({onComplete:()=>{input.focus()}});

                    this.isSearch = !this.isSearch;
                    if (this.isSearch) tl.to(input, {opacity:1, height:50});
                    else {
                        tl.to(input, {opacity:0, height:0});
                        this.searchForm = '';
                    }
                }

                if (i === 2) {
                    const input =  document.querySelector('.add-input input');
                    const tl = new TimelineMax({onComplete:()=>{input.focus()}});

                    this.isAdd = !this.isAdd;
                    if (this.isAdd) tl.to('.add-input', {opacity:1, height:50});
                    else {
                        if (!this.addForm) tl.to('.add-input', {opacity:0, height:0});
                    }

                    if (this.addForm) {
                        if (/^[a-z\s]+$/i.test(this.addForm)) this.currLang.eng = this.addForm;
                        if (/[а-яё]/i.test(this.addForm)) this.currLang.ru = this.addForm;

                        this.addForm = '';

                        if (this.currLang.eng && this.currLang.ru) {
                            this.wordList.push({
                                eng: this.currLang.eng,
                                ru: this.currLang.ru
                            });

                            this.currLang.eng = '';
                            this.currLang.ru = '';
                            tl.to('.add-input', {opacity:0, height:0});
                        }

                    } else {
                        this.currLang.eng = '';
                        this.currLang.ru = '';
                    }
                }
            }
        },

        mounted() {

        }
    }
</script>

<style lang="scss" scoped>
    .container {
        width: 100%;
        height: 100%;
    }

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
                border: 1px solid #000000;
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
            padding: 10px;
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
            overflow: auto;

            .lang {
                //width: 100%;
                height: 100%;
                display: flex;
                justify-content: flex-start;
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
                justify-content: flex-start;
                width: 30px;
                height: 100%;
            }

            &.add-input {
                opacity: 0;
                border: none;
                border-radius: 0;
                -webkit-appearance: none;

                .lang {
                    border: none;
                }

                .ph-color::-webkit-input-placeholder {
                    color: #67b267;
                }
            }
        }
    }

    @media (max-width: 768px) and (orientation: portrait) {
        .container {

        }
    }
</style>

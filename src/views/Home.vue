<template>
		<main class="container" v-touch:swipe="swipeHandler">
				<div class="search">
						<label class="search-label" for="search" @click="">
								<font-awesome-icon :icon="isIcons[0]"/>
						</label>
						<input class="search-input" id="search" type="text" placeholder="Search" v-model="searchForm">
				</div>
				<ul class="word-list">
						<transition-group name="fade">
								<li v-for="(itm, i) in wordList" :key="itm+i" :class="`word-list_item word-list_item-${i+1}`">
										<div class="lang eng">{{itm.eng}}</div>
										<span class="arrow">→</span>
										<div class="lang ru">{{itm.ru}}</div>
								</li>
						</transition-group>
						<li class="word-list_item add-word">
								<label class="add-word_label" for="add" @click="isButton(2)">
										<font-awesome-icon :icon="isIcons[4]"/>
								</label>
								<input id="add" :class="['add-word_input lang', {'ph-color': (currLang.eng || currLang.ru)}]"
											 type="text"
											 :placeholder="(!currLang.eng && !currLang.ru) ? 'Enter some word' : 'Enter translation'"
											 v-model="addForm">
						</li>
				</ul>
				<ul class="menu">
						<li v-for="(itm, i) in isButtons" :key="itm+i" :class="`menu_item menu_item-${i+1}`">
								<button :class="`menu_item_btn menu_item_btn${i+1}`" @click="isButton(i+1)">
										<font-awesome-icon :icon="isIcons[i]"/>
										<span class="menu_item_text">{{itm}}</span>
								</button>
						</li>
				</ul>
		</main>
</template>

<script>
		import {TimelineMax} from "gsap";
		import {faSearch, faCommentMedical, faEdit, faTrashAlt, faCheck} from '@fortawesome/free-solid-svg-icons'

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
						isButtons() {
								return [
										!this.searchForm ? "Search" : "Find?",
										!this.addForm ? "Add" : "Save?",
										"Edit",
										"Delete"
								]
						},

						isIcons() {
								return [
										faSearch,
										faCommentMedical,
										faEdit,
										faTrashAlt,
										faCheck
								]
						}
				},

				watch: {
						searchForm(val) {
								this.$nextTick(() => {
										const tl = new TimelineMax();
										if (val) tl.to('.search-label', .3, {right: 0});
										else tl.to('.search-label', .3, {right: -50});
								})
						},

						addForm(val) {
								this.$nextTick(() => {
										const
												tl1 = new TimelineMax(),
												tl2 = new TimelineMax();

										if (val) {
												tl1.to('.menu_item_btn2', .3, {color: '#67b267'});
												tl2.to('.add-word_label', .3, {right: 0});

										} else tl2.to('.add-word_label', .3, {right: -50});
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
										const input = document.querySelector('.search-input');
										const tl = new TimelineMax({
												onComplete: () => {
														input.focus()
												}
										});

										this.isSearch = !this.isSearch;
										if (this.isSearch) tl.to(input, {opacity: 1, padding: 10, height: '100%'});
										else {
												tl.to(input, {opacity: 0, padding: 0, height: 0});
												this.searchForm = '';
										}
								}

								if (i === 2) {
										const input = document.querySelector('.add-word input');
										const tl = new TimelineMax({
												onComplete: () => {
														input.focus()
												}
										});

										this.isAdd = !this.isAdd;
										if (this.isAdd) tl.to('.add-word', {opacity: 1, height: 50});
										else {
												if (!this.addForm) tl.to('.add-word', {opacity: 0, height: 0});
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
														tl.to('.add-word', {opacity: 0, height: 0});
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
		$c-bg: #e7e7e7;
		$c-text: #6b6b6b;
		$c-attribute: #ffffff;
		$c-green: #67b267;
		$f-main: 'Diaria Sans Pro', serif;

		.container {
				width: 100%;
				height: 100%;
				background-color: $c-bg;
		}

		.menu {
				position: absolute;
				bottom: 0;
				display: flex;
				width: 100%;
				background-color: $c-attribute;

				&_item {
						width: 100%;
						height: 50px;

						&_btn {
								width: 100%;
								height: 50px;
								background: #ffffff;
								border: none;
								color: $c-text;
						}

						svg {
								width: 20px;
								height: 20px;
						}

						&_text {
								display: block;
								margin-top: 2px;
								font-size: 12px;
								font-family: $f-main;
						}
				}
		}

		.search {
				width: 100%;
				height: auto;
				color: $c-text;
				font-size: 18px;
				font-weight: 500;
				font-family: $f-main;
				position: relative;
				overflow: hidden;

				&-label {
						width: 15%;
						max-width: 120px;
						height: 100%;
						display: flex;
						justify-content: center;
						position: absolute;
						right: -50px;

						svg {
								width: 25px;
								height: 25px;
								align-self: center;
						}
				}

				&-input {
						width: 100%;
						height: 0;
						background-color: $c-bg;
						opacity: 0;
						border: none;
						border-bottom: 1px solid $c-attribute;
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
						border-bottom: 2px solid $c-attribute;
						font-size: 28px;
						font-weight: 500;
						overflow: auto;

						.lang {
								height: 100%;
								display: flex;
								justify-content: flex-start;
								align-items: center;
								background-color: $c-bg;
								color: darken($c-text, 15%);
								padding: 10px;

								&.ru {
										color: $c-text;
								}
						}

						.arrow {
								display: flex;
								align-items: center;
								justify-content: flex-start;
								width: 30px;
								height: 100%;
								color: $c-attribute;
						}
				}

				.add-word {
						opacity: 0;
						border: none;
						border-radius: 0;
						-webkit-appearance: none;
						position: relative;
						overflow: hidden;

						&_label {
								width: 15%;
								max-width: 120px;
								height: 100%;
								color: $c-text;
								display: flex;
								justify-content: center;
								position: absolute;
								right: -50px;

								svg {
										width: 25px;
										height: 25px;
										align-self: center;
								}
						}

						&_input {
								width: 100%;
								height: 100%;
								background-color: $c-bg;
								border: none;
								-webkit-appearance: none;
						}

						.ph-color::-webkit-input-placeholder {
								color: $c-green;
						}
				}
		}

		@media (max-width: 768px) and (orientation: portrait) {
				.container {

				}
		}
</style>

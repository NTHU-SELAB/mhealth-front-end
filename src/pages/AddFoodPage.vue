<<<<<<< HEAD
<template>
    <div id="add-food-page">
        <ul class="nav nav-pills nav-fill">
            <li class="nav-item">
                <a :class="{'nav-link':true, 'active':currentPage == 'AddFoodManually'}" 
                    href="#" v-on:click="switchToPage('AddFoodManually')">
                    手動輸入
                </a>
            </li>
            <li class="nav-item">
                <a :class="{'nav-link':true, 'active':currentPage == 'AddFoodCamera'}" 
                    href="#" v-on:click="switchToPage('AddFoodCamera')">
                    拍照辨識
                </a>
            </li>
        </ul>
        <add-food-manually v-show="currentPage == 'AddFoodManually'"></add-food-manually>
        <add-food-camera v-show="currentPage == 'AddFoodCamera'"></add-food-camera>
    </div>
</template>

<script>

import AddFoodManually from '@/components/AddFoodManually.vue'
import AddFoodCamera from '@/components/AddFoodCamera.vue'

export default {
    name: 'addFoodPage',

    data() {
        return {
            currentPage: 'AddFoodManually'
        }
    },

    mounted() {
        liff.init(
            data => {
                // const userId = data.context.userId;
                
            }, err => {
                console.log(err)
            }
        );
    },

    components: {
        AddFoodManually,
        AddFoodCamera
    },

    methods: {
        switchToPage(page) {
            this.currentPage = page
        }
    }
}
</script>

<style>

</style>
=======
<template>
    <div id="add-food-page" class="container">
        <ul class="nav nav-pills nav-fill">
            <li class="nav-item">
                <a :class="{'nav-link':true, 'active':currentPage == 'AddFoodManually'}" 
                    href="#" v-on:click="switchToPage('AddFoodManually')">
                    手動輸入
                </a>
            </li>
            <li class="nav-item">
                <a :class="{'nav-link':true, 'active':currentPage == 'AddFoodCamera'}" 
                    href="#" v-on:click="switchToPage('AddFoodCamera')">
                    拍照辨識
                </a>
            </li>
        </ul>
        <add-food-manually v-show="currentPage == 'AddFoodManually'"></add-food-manually>
        <add-food-camera v-show="currentPage == 'AddFoodCamera'"></add-food-camera>
    </div>
</template>

<script>

import AddFoodManually from '@/components/AddFoodManually.vue'
import AddFoodCamera from '@/components/AddFoodCamera.vue'

export default {
    name: 'addFoodPage',

    data() {
        return {
            currentPage: 'AddFoodManually'
        }
    },

    mounted() {
        liff.init(
            data => {
                // const userId = data.context.userId;
                
            }, err => {
                console.log(err)
            }
        );
    },

    components: {
        AddFoodManually,
        AddFoodCamera
    },

    methods: {
        switchToPage(page) {
            this.currentPage = page
        }
    }
}
</script>

<style>
#add-food-page {
    background-color: #eeeeee;
    padding-top: 10px;
    height: 110vh;
}
</style>
>>>>>>> cbf7592b729c36e19e8df33e38a894b9a7a72343

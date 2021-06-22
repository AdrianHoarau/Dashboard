<template>
<div class="gridvue-template">
  
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <form method="get" action="/api/logout">
              <button type="logout" class="btn btn-outline-primary">Logout</button>
            </form>
          </li>
        </ul>
    </nav>

  <div id="Dashboard">
    <div id="wrapper" style="align-items: stretch;width: 100%; height: 100%;">
      <div style="position:relative;width:100%;height:100%;">
        <div style="height: 100%">
          <div style="float:right;">
            <vue-dropdown @setSelectedOption="addNewWidget($event.value)" :config="dropMenuConfig"></vue-dropdown>
          </div>
        </div>
        <VueResponsiveGridLayout
          :style="{ style: 'grid-item' }"
          @layout-update="onLayoutUpdate"
          @layout-change="onLayoutChange"
          @layout-init="onLayoutInit"
          @width-change="onWidthChange"
          @breakpoint-change="onBreakpointChange"
          :layouts="layouts"
          :compact-type="'vertical'"
          :breakpoint="breakpoint"
          :cols="cols"
          ref="layout"
        >
          <template slot-scope="props">
            <VueGridItem
              v-for="item in props.layout"
              :i="item.i"
              :key="item.i"
              :w.sync="item.w"
              :h.sync="item.h"
              :x="item.x"
              :y="item.y"
              :container-width="props.containerWidth"
              :row-height="props.rowHeight"
              :is-draggable="true"
              :is-resizable="true"
              :class-name="'grid-item'"
              :cols="props.cols"
              :height-from-children="false"
              :max-rows="props.maxRows"
            >
              <div class="dab-card" >
                <div v-for="(child, index) in children" :key="child.name">
                  <div v-if="child.name == getItemName(item) && (index) == (parseInt(getItemNumber(item), 10))">
                      <component :is="child" :key="child.name"></component>
                  </div>
                </div>
                <button style="position: absolute; right: 0; height: 5;" button class="buttonErase" @click="removeItem(item, item.i);">X</button>
              </div>
            </VueGridItem>
          </template>
        </VueResponsiveGridLayout>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import VueDropdown from 'vue-dynamic-dropdown';
import weatherComponent from "./WeatherComponent";
import spotifyComponentP from "./SpotifyComponentPlaylists";
import spotifyComponentT from "./SpotifyComponentTop";
import youtubeComponentL from "./YoutubeLikesComponent";
import youtubeComponentS from "./YoutubeSubscribeComponent";
import twitterComponentF from "./TwitterComponentFavorite";
import twitterComponentR from "./TwitterComponentRetweet";
import twitterComponentT from "./TwitterComponentTweet";
/*eslint no-unused-vars: */
import {callApiLoadWidget, callApiDeleteWidget, callApiClearWidget} from "../services/UserService";

import {
  VueResponsiveGridLayout,
  VueGridItem
} from "vue-responsive-grid-layout";
export default {
  name: "Dashboard",
  components: {
    VueResponsiveGridLayout,
    VueGridItem,
    VueDropdown,
  },
  mounted: function () {
    this.$nextTick(function () {
          window.setInterval(() => {
              this.saveWidgets();
          },1000);
     })
  },

  beforeRouteLeave(to, from, next) {
    this.saveWidgets();
    next();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.loadWidgets();
    })
  },
  data() {
    return {
      children: [],
      layouts: {
        lg: []
      },
      breakpoint: "lg",
      cols: 10,
      breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
      colsAll: { lg: 10, md: 8, sm: 6, xs: 4, xxs: 2 },
      isDraggable: true,
      isResizable: true,
      dropMenuConfig: {
            options: [
                {
                    value: "Weather Widget"
                },
                {
                    value: "Spotify Playlists Widget"
                },
                {
                    value: "Spotify Tops Widget"
                },
                {
                    value: "Youtube Subscribed Widget"
                },
                {
                    value: "Youtube Likes Widget"
                },
                {
                    value: "Twitter Favorites Widget"
                },
                {
                    value: "Twitter Retweets Widget"
                },
                {
                    value: "Twitter Tweet Widget"
                },
            ],
            prefix: "Add Widget",
            backgroundColor: "cyan",
            'border-style': "groove",
            border: "2px solid black",
      },
    };
  },
  methods: {

    loadPage:function() {
      this.loadWidgets();
    },

    addNewWidget(compName) {
      if (compName == 'Weather Widget') {
        this.addItem("weatherComponent");
        this.children.push(weatherComponent);
      }
      if (compName == 'Spotify Playlists Widget') {
        this.addItem("spotifyComponentP");
        this.children.push(spotifyComponentP);
      }
      if (compName == 'Spotify Tops Widget') {
        this.addItem("spotifyComponentT");
        this.children.push(spotifyComponentT);
      }
      if (compName == 'Twitter Favorites Widget') {
        this.addItem("twitterComponentF");
        this.children.push(twitterComponentF);
      }
      if (compName == 'Twitter Retweets Widget') {
        this.addItem("twitterComponentR");
        this.children.push(twitterComponentR);
      }
      if (compName == 'Twitter Tweet Widget') {
        this.addItem("twitterComponentT");
        this.children.push(twitterComponentT);
      }
      if (compName == 'Youtube Likes Widget') {
        this.addItem("youtubeComponentL");
        this.children.push(youtubeComponentL);
      }
      if (compName == 'Youtube Subscribed Widget') {
        this.addItem("youtubeComponentS");
        this.children.push(youtubeComponentS);
      }
    },

    getItemName(item) {
      var itemName = item.i;
      return (itemName.split('-')[1]);
    },

    getItemNumber(item) {
      var itemName = item.i;
      return (itemName.split('-')[0]);
    },

    onLayoutUpdate(layout, layouts, last) {
      this.$set(this.layouts, this.breakpoint, layout);
    },

    onLayoutChange(layout, layouts, breakpoint) {
      this.$set(this.layouts, breakpoint, layout);
    },

    onLayoutInit(layout, layouts, cols, breakpoint) {
      this.cols = cols;
      this.breakpoint = breakpoint;
      this.$set(this.layouts, breakpoint, layout);
    },

    onBreakpointChange(breakpoint) {
      this.breakpoint = breakpoint;
    },

    onWidthChange(width, cols) {
      this.cols = cols;
    },

    addItem(itemType) {
      var max = this.layouts.lg.length;
      Object.keys(this.layouts).map(breakpoint => {
        this.layouts[breakpoint].push({
          x: 2,
          y: 0,
          w: 3,
          h: 32,
          i: (max).toString()+"-"+itemType,
        });
      });
    },

    addItemAdvanced(x, y, w, h, i) {
      Object.keys(this.layouts).map(breakpoint => {
        this.layouts[breakpoint].push({
          x: x,
          y: y,
          w: w,
          h: h,
          i: i,
        });
      });
    },

    removeItem(item, id) {
      Object.keys(this.layouts).map(breakpoint => {
        const index = this.layouts[this.breakpoint].findIndex(item => {
          return item.i === id;
        });
        this.layouts[breakpoint].splice(index, 1);
      });
      var index = parseInt(this.getItemNumber(item), 10);
      if (index > -1)
        this.children.splice(index, 1);
      this.updateChildrenArray(index);
      this.saveWidgets();
    },

    updateChildrenArray(lastItemIndex) {
      var nb;
      var name;
      for (var element of this.layouts.lg) {
        nb = parseInt(this.getItemNumber(element));
        if (nb >= lastItemIndex) {
          nb = nb - 1;
          name = this.getItemName(element);
          element.i = nb+"-"+name;
        }
      }
    },

    saveWidgets() {
      var baseUrl = "/api/save/widget?";
      var addUpUrl = "";
      var newUrl = "";

    callApiClearWidget().then((res) => {  
        for (var element of this.layouts.lg) {
          addUpUrl = 'index='+this.getItemNumber(element)
          +'&x='+element.x
          +'&y='+element.y
          +'&w='+element.w
          +'&h='+element.h
          +'&i='+element.i
          newUrl = baseUrl+addUpUrl;
          fetch(newUrl);
        }
      });
    },
    loadWidgets() {
      callApiLoadWidget().then((res) => {
          var result = JSON.parse(JSON.stringify(res));
          var json = JSON.parse(JSON.stringify(result));
          var obj = "";
          var compName = "";
          this.layouts.lg = [];
          for (var i = 0; i < json.length; i++) {
                obj = json[i];
                compName = obj.i.split('-')[1];
                this.addItemAdvanced(obj.x, obj.y, obj.w, obj.h, obj.i);
                  if (compName == 'weatherComponent')
                    this.children.splice(obj.index, 0, weatherComponent);
                  if (compName == 'spotifyComponentP')
                    this.children.splice(obj.index, 0, spotifyComponentP);
                  if (compName == 'spotifyComponentT')
                    this.children.splice(obj.index, 0, spotifyComponentT);
                  if (compName == 'twitterComponentF')
                    this.children.splice(obj.index, 0, twitterComponentF);
                  if (compName == 'twitterComponentR')
                    this.children.splice(obj.index, 0, twitterComponentR);
                  if (compName == 'twitterComponentT')
                    this.children.splice(obj.index, 0, twitterComponentT);
                  if (compName == 'youtubeComponentL')
                    this.children.splice(obj.index, 0, youtubeComponentL);
                  if (compName == 'youtubeComponentS')
                    this.children.splice(obj.index, 0, youtubeComponentS);
          }
      });
    },
  }
};
</script>

<style>
#app {
  background: rgba(255, 255, 255, 0.486);
  border-radius: 10px;
  transition: all 0.2s;
}

html {
  height: 100%;
}

body {
  height: 100%;
}

#content {
  padding: 0px 20px;
  min-height: 100vh;
  transition: all 0.3s;
  width: 100%;
}

.resizable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  bottom: 0;
  right: 0px;
  text-align: right;
}
.resizable-handle::after {
  content: "";
  position: absolute;
  right: 3px;
  bottom: 3px;
  width: 5px;
  height: 5px;
  border-right: 2px solid #000000;
  border-bottom: 2px solid #000000;
}
.vue-grid-draggable-container {
  width: 100%;
  height: 100%;
}
.grid-item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-style: groove;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  border-radius: 12px;
  border: 2px solid #000;
}
.vue-grid-placeholder {
  background: #ddd;
  border: 1px dashed #aaa;
}

.vue-grid-layout {
  background: rgba(255, 255, 255, 0.486);
  width: 100%;
  display: block;
  position: relative;
  height: 100%;
}
</style>

<template>
  <div class="page-content">
    <ul class="pager-list">
      <li class="d-inline-block mx-1">
        <button type="button" :disabled="currentPage <= 1" @click="prev">
          <i class="el-icon el-icon-arrow-left"></i>
        </button>
      </li>
      <li class="d-inline-block mx-1" v-if="internalPageCount > 0" :class="{'current-pager': currentPage === 1}"
          @click="onPagerClick">
        <button type="button">1</button>
      </li>
      <li class="d-inline-block el-icon pager-more-prev mx-1" :class="prevIconClass"
          @click="onPagerClick"
          @mouseenter="directionMouseenter('prev')"
          @mouseleave="prevIconClass = 'el-icon-more'"
          v-if="showPrevMore"></li>
      <li v-for="pager in pagers" :key="pager" :class="{'current-pager': currentPage === pager}"
          class="d-inline-block mx-1" @click="onPagerClick">
        <button type="button">{{ pager }}</button>
      </li>
      <li class="d-inline-block el-icon pager-more-next mx-1" :class="nextIconClass"
          @click="onPagerClick"
          @mouseenter="directionMouseenter('next')"
          @mouseleave="nextIconClass = 'el-icon-more'"
          v-if="showNextMore"></li>
      <li class="d-inline-block mx-1" v-if="internalPageCount > 1"
          @click="onPagerClick"
          :class="{'current-pager': currentPage === internalPageCount}">
        <button type="button">{{ internalPageCount }}</button>
      </li>
      <li class="d-inline-block mx-1">
        <button type="button" :disabled="currentPage === internalPageCount" @click="next">
          <i class="el-icon el-icon-arrow-right"></i>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PageList",
  data() {
    return {
      nextIconClass: 'el-icon-more',
      prevIconClass: 'el-icon-more',
      showPrevMore: false,
      showNextMore: false,
    }
  },
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    total: Number,
    pageCount: Number,
    currentPage: {
      type: Number,
      default: 1
    },
    pagerCount: {
      type: Number,
      default: 7
    }
  },
  computed: {
    internalPageCount() {
      if (typeof this.total === 'number') {
        return Math.max(1, Math.ceil(this.total / this.pageSize));
      } else if (typeof this.pageCount === 'number') {
        return Math.max(1, this.pageCount);
      }
      return null;
    },
    pagers() {
      let pagerCount = this.pagerCount;
      let halfPagerCount = (pagerCount - 1) / 2;
      let currentPage = Number(this.currentPage);
      let pageCount = Number(this.internalPageCount);
      let showPrevMore = false;
      let showNextMore = false;
      if (pageCount > pagerCount) {
        if (currentPage > pagerCount - halfPagerCount) {
          showPrevMore = true;
        }

        if (currentPage < pageCount - halfPagerCount) {
          showNextMore = true;
        }
      }
      const pagerArray = [];
      let startPager = 2, endPager;
      if (showPrevMore && !showNextMore) {
        startPager = pageCount - (pagerCount - 2);
        endPager = pageCount - 1;
      } else if (!showPrevMore && showNextMore) {
        endPager = pagerCount - 1;
      } else if (showPrevMore && showNextMore) {
        let offset = Math.floor(pagerCount / 2) - 1;
        startPager = currentPage - offset;
        endPager = currentPage + offset
      } else {
        endPager = pageCount - 1;
      }
      for (let i = startPager; i <= endPager; i++) {
        pagerArray.push(i);
      }
      this.showPrevMore = showPrevMore;
      this.showNextMore = showNextMore;
      return pagerArray;
    }
  },
  methods: {
    directionMouseenter(direction) {
      if (direction === 'prev') {
        this.prevIconClass = 'el-icon-d-arrow-left';
      } else {
        this.nextIconClass = 'el-icon-d-arrow-right';
      }
    },
    onPagerClick(event) {
      let target = event.target;
      let newPage = Number(event.target.textContent);
      let pageCount = this.internalPageCount;
      let currentPage = this.currentPage;
      let pagerCountOffset = this.pagerCount - 2;
      if (target.className.indexOf('pager-more-prev') !== -1) {
        newPage = currentPage - pagerCountOffset;
      } else if (target.className.indexOf('pager-more-next') !== -1) {
        newPage = currentPage + pagerCountOffset;
      }
      if (!isNaN(newPage)) {
        if (newPage < 1) {
          newPage = 1;
        }

        if (newPage > pageCount) {
          newPage = pageCount;
        }
      }
      if (newPage !== currentPage) {
        this.$emit('current-change', newPage);
      }
    },
    prev() {
      let newPage = this.currentPage - 1;
      if (newPage < 1) {
        newPage = 1;
      }
      this.$emit('current-change', newPage);
    },
    next() {
      let newPage = this.currentPage + 1;
      if (newPage > this.internalPageCount) {
        newPage = this.internalPageCount;
      }
      this.$emit('current-change', newPage);
    }
  }
}
</script>

<style scoped>
.page-content button {
  background-color: var(--bgColor);
  color: var(--subFontColor);
  border: 1px solid var(--borderColor)
}

.current-pager button {
  background-color: var(--mainThemeColor);
  color: #FFF;
  border: 1px solid var(--mainThemeColor)
}

</style>
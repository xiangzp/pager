Vue.component('my-pager', {
        template: '<div data-type="pager" class="runway-pager">' +
                    '<a @click="gotoPage(1)" id="firstPage">首页</a>' +
                    '<a @click="current != 1 && current-- && gotoPage(current)" id="prePage">上一页</a>' +
                    '<a v-for="index in pages.before" @click="gotoPage(index)" :class="{current: current == index}" :key="index">{{index}}</a>' +
                    '<span v-if="hasOmit">. . .</span>'+
                    '<a v-if="hasAfter" v-for="index in pages.after" @click="gotoPage(index)" :class="{current: current == index}" :key="index">{{index}}</a>' +
                    '<a @click="current != totalPage && current++ && gotoPage(current)" id="nextPage">下一页</a>' +
                    '<a @click="gotoPage(totalPage)" id="lastPage">尾页</a>' +
                    '<span class="totalPages"> 共 <span>{{totalPage}}</span> 页</span>' +
                   '</div>',
        props: ['total','pagesize'],
        data: function () {
            return {
                current: 1,
                hasOmit: false,
                hasAfter: false
            }
        },
        computed: {
            pages: function () {
                var _arr = {before: [], after: []}, current = this.current, total = this.totalPage;
                if(this.totalPage > 6){
                    //当前页码小于5的时候，显示省略号
                    if(current<5){
                        for(var i = 0;i < 5;i++){
                            _arr.before.push(i+1);
                        }
                        _arr.after.push(total);
                        this.hasOmit = true;
                        this.hasAfter = true;
                        return _arr;
                    }else{
                        //判断页码在末尾的时候
                        if(current < total - 3) {
                            for(var i = current - 2; i < current + 3; i++) {
                                _arr.before.push(i)
                            }
                            _arr.after.push(total);
                            this.hasOmit = true;
                            this.hasAfter = true;
                            return _arr;
                            //页码在中间部分时候
                        } else {
                            for(var i = total - 4; i < total + 1; i++) {
                                _arr.after.push(i);
                            }
                            _arr.before.push(1)
                            this.hasOmit = true;
                            this.hasAfter = true;
                            return _arr;
                        }
                    }
                }else{
                    //页面总数小于6的时候
                    for(var i=0;i<total;i++){
                        _arr.before.push(i+1);
                    }
                    this.hasOmit = false;
                    this.hasAfter = false;
                    return _arr;
                }
            },
            totalPage: function(){
                return Math.ceil(Number(this.total)/Number(this.pagesize))
            }
        },
        methods: {
            gotoPage: function (page) {
                if(page == this.current){
                    return;
                }
                this.current = page;
                this.$emit('paging', page);
            }
        }
    });

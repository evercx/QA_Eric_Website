/**
 * Created by EVERCX on 2017/12/16.
 */


//new Vue().$mount('#app')




var formApp = new Vue({
    el:"#app",
    data:{
        question:'',
        answer:'',
        loading:false
    },
    computed:{
    },
    methods:{
        submitQuestion:function(){
            var _self = this;
            if(_self.question.trim() === ''){
                alert("请填写文本");
                return;
            }
            _self.loading = true;
            var requestConfig = {
                method: 'post',
                url: '/api/v1/question',
                data:{
                    "question":_self.question
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            axios(requestConfig).then(function (res) {
                console.log(res.data['answer']);
                _self.loading = false;
                _self.answer = res.data['answer'];
            }).catch(function(){
                _self.loading = false;
            })
        }
    }
});
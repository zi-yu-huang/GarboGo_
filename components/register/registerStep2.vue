<template lang="pug">
//- 請填寫功能描述👈
#RegisterStep2
  .content-area
    div.title-content 註冊
    aFormModel.form-area(
        ref="ruleForm"
        :model="memberForm"
        :rules="rules"
        )
        aFormModelItem(ref="memberPhone" prop="memberPhone")
        aInput.input-font(
            placeholder="請輸入驗證碼"
            v-model="memberForm.memberPhone"
            :maxLength="9"
            )
        aFormModelItem
        aButton.btn-area(type="primary" @click="OnSubmit") {{"下一步 "}}
</template>

<script>
export default {
    name: "RegisterStep2",
    data () {
    return {
        memberForm:{
        memberPhone: ""
        },
        rules: {
        memberPhone: [
            { required: true,message: "不可為空"},
            { min: 9, message: "手機號碼格式錯誤", trigger: "blur" },
        ]
        }
    };
    },
};
</script>

<style lang="scss" scoped>
// 排版
#RegisterStep2 {
  .content-area{
    padding: 50px;
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 70vh;
    justify-content: center;
    }
}
// 元件
#RegisterStep2 {
    .title-content{
    color: white;
    font-size: 35px;
    font-family: Inter;
    font-weight: 800;
    line-height: 42px;
    letter-spacing: 0em;

    }
    .btn-area{
        background-color: #241F1F;
        width: -webkit-fill-available;
        text-align: center;
        font-family: Inter;
        font-size: 20px;
        font-weight: 600;
        line-height: 24px;
        letter-spacing: 0em;
        // text-align: left;

    }
}
</style>

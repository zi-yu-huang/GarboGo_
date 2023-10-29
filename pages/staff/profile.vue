<template lang="pug">
//- memberProfile
#StaffProfile
  .user-area
    .circle-area
      aIcon.icon-area(type="user")
    .user-text {{ "使用者暱稱" }}
  .edit-area
    ProfileInput(
      :notEdit="notEdit",
      :getInit="getInit",
      @openPhone="OpenPhone",
      @openPassword="OpenPassword",
      @EditName="EditName"
    )
    .btn-content
      aButton.btn-area(type=primary, @click="ChangeEditBtn") {{ editText }}
        aIcon(:type="changeEdit")
  EditPhone(:visible="openPhone", @getVerify="GetVerify")
  EditVerify(
    :visible="getVerify",
    :getOptId="getOptId",
    @verifyDone="VerifyDone"
  )
  EditPassword(
    :visible="openPassword",
    @donePassword="DonePassword",
    @CloseModal="DonePassword"
  )
</template>
  
  <script>
import $ from "jquery";
import { LoginApi } from "@/services/login.js";
import { EditUserApi } from "@/services/editUser.js";
import debounce from "lodash/debounce";
export default {
  layout: "staff",
  components: {
    ProfileInput: () => import("@/components/profile/profileInput"),
    EditPhone: () => import("@/components/profile/EditPhone"),
    EditVerify: () => import("@/components/profile/EditVerificationCode"),
    EditPassword: () => import("@/components/profile/EditPassword"),
  },
  name: "StaffProfile",
  data() {
    return {
      uid: "",
      getInit: false,
      dataPwd: "",
      dataEmail: "",
      editName: "",
      getVerify: false,
      getOptId: null,
      openPhone: false,
      openPassword: false,
      notEdit: true,
      editText: "",
    };
  },
  mounted() {
    if (this.openPassword === true) {
      $(document).click((event) => {
        if (this.openPassword === true) {
          const target = $(event.target);
          const menuIcon = $(".block-area");
          if (!target.closest(menuIcon).length) {
            this.openPassword = false;
          }
        }
      });
    }
  },
  computed: {
    changeEdit() {
      if (this.notEdit === true) {
        this.editText = "修改";
        return "edit";
      } else {
        this.editText = "儲存";
        return "save";
      }
    },
  },
  mounted() {
    this.Init();
  },
  methods: {
    async Init() {
      await this.GetUserPwdApi();
    },
    async ChangeEditBtn() {
      if (this.notEdit === true) {
        this.notEdit = false;
      } else {
        this.notEdit = true;
        await this.GetUserNameApi();
      }
    },
    OpenPhone(val) {
      this.openPhone = val;
    },
    GetVerify(val, otpId) {
      this.getVerify = val;

      this.getOptId = otpId;
      this.openPhone = false;
    },
    VerifyDone() {
      this.getVerify = false;
      this.ChangeEditBtn();
      this.getInit = true;
    },
    OpenPassword(val) {
      this.openPassword = val;
    },
    DonePassword(val) {
      this.openPassword = false;
      this.dataPwd = val
      
      this.ChangeEditBtn();
      this.getInit = true;
    },
    EditName(val) {
      this.editName = val;
    },
    GetCookieValue(cookieName) {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${cookieName}=`)) {
          return decodeURIComponent(cookie.substring(cookieName.length + 1));
        }
      }
      return null; // 如果找不到对应的 Cookie，则返回 null
    },

    //API ------------
    async GetUserPwdApi() {
      const email = this.GetCookieValue("email");
      this.uid = this.GetCookieValue("id");
      const response = await LoginApi(email);
      this.editName = response.uname;
      this.dataPwd = response.pwd;
      this.dataEmail = response.email;
    },

    // API----------
    async GetUserNameApi() {

      const response = await EditUserApi(
        this.uid,
        this.editName,
        this.dataEmail,
        this.dataPwd
      );
      if (response.data.status === "success") {
        this.$message.success("變更成功");
      }
    },
  },
};
</script>
  
  <style lang="scss" scoped>
// 排版
#StaffProfile {
  background-color: white;
  .user-area {
    background-color: white;
    padding-bottom: 20px;
  }

  .btn-content {
    bottom: 90px;
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
// 元件
#StaffProfile {
  .user-area {
    display: flex;
    padding-top: 14%;
    flex-direction: column;
    align-items: center;
    .circle-area {
      width: 85px;
      height: 85px;
      border-radius: 50%;
      background-color: #dbefbf;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-area {
        align-items: center;
        font-size: 55px;
        color: black;
        margin-bottom: 10px;
      }
    }
    .user-text {
      font-size: 24px;
      color: black;
    }
  }

  .btn-area {
    border-radius: 30px;
    height: 47px;
    color: black;
    font-size: 20px;
    padding: 0 10px;
    border: 3px solid #68b000;
  }
  @media (min-width: 769px) {
    .user-area {
      padding-top: 7%;
    }
    .btn-content {
      bottom: 18%;
    }
  }
}
</style>
  
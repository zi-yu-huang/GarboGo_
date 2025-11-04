<template lang="pug">
//- memberProfile
#MemberProfile
  .user-area
    .circle-area
      aIcon.icon-area(type="user")
    .user-text {{ "會員資訊" }}
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
  EditPhone(:visible="openPhone",    :memberName="editName"
 @getVerify="GetVerify" @CloseEmailModal="CloseEmailModal")
  EditVerify(
    :memberEmail="dataEmail"
    :memberName="editName"
    :visible="getVerify",
    :getNewEmail="newEmail",
    @verifyDone="VerifyDone"
    @CloseVerifyModal="CloseVerifyModal"
  )
  EditPassword.edit-area(
    :visible="openPassword",
    @donePassword="DonePassword",
    @ClosePwdModal="ClosePwdModal"
  )
</template>

<script>
import { LoginApi } from "@/services/login.js";
import { SendEmailApi } from "@/services/sendEmail";
import { CreateUserApi } from "@/services/editUser.js";
export default {
  layout: "default",
  components: {
    ProfileInput: () => import("@/components/profile/profileInput"),
    EditPhone: () => import("@/components/profile/EditPhone"),
    EditVerify: () => import("@/components/profile/EditVerificationCode"),
    EditPassword: () => import("@/components/profile/EditPassword"),
  },
  name: "MemberProfile",
  data() {
    return {
      uid: "",
      getInit: false,
      dataPwd: "",
      dataEmail: "",
      editName: "",
      getVerify: false,
      openPhone: false,
      openPassword: false,
      notEdit: true,
      editText: "",
      newEmail: "",
    };
  },
  mounted() {
    // if (this.openPassword === true) {
    // }
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
    if (window.location.pathname.toLowerCase().includes("login")) {
      window.location.href = "/member";
    }
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
    CloseEmailModal() {
      this.openPhone = false;
    },
    GetVerify(val, newEmail) {
      this.getVerify = val;
      this.newEmail = newEmail;
      this.openPhone = false;
    },
    VerifyDone() {
      this.getVerify = false;
      // this.ChangeEditBtn();
      this.getInit = true;
    },
    CloseVerifyModal() {
      this.getVerify = false;
    },
    OpenPassword(val) {
      this.openPassword = val;
    },
    ClosePwdModal() {
      this.openPassword = false;
    },
    DonePassword(val) {
      this.openPassword = false;
      this.dataPwd = val;
      this.GetNewPwdApi();
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
      const data = {
        uname: this.editName,
        email: this.dataEmail,
        pwd: this.dataPwd,
      };
      const response = await CreateUserApi(data);
      if (response.data.success === true) {
        this.$message.success("變更成功");
      }
    },

    async GetSendEmailApi() {
      const data = {
        email: this.dataEmail,
        uname: this.editName,
      };
      const response = await SendEmailApi(data);

      return response;
    },
    async GetNewPwdApi() {
      const response = await EditUserApi(
        this.uid,
        this.editName,
        this.dataEmail,
        this.dataPwd
      );
      if (response.data.status === "success") {
        this.$message.success("變更成功,請重新登入");
        this.$nextTick(() => {
          this.$router.push("/member/login");
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// 排版
#MemberProfile {
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
#MemberProfile {
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

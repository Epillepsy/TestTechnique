<template>
  <div class="detail">
    <el-row>
      <el-col
        :span="23"
        class="section bold contactHeader"
      >
        <div class="contactName">
          {{ message.contact.firstname }} {{ message.contact.lastname }}
        </div>
        <el-row>
          <el-col :span="12">
            Email
          </el-col>
          <el-col
            :span="12"
            class="text-blue"
          >
            <a :href="`mailto:${message.contact.email}`"> {{ message.contact.email }}</a>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            Telephone
          </el-col>
          <el-col
            :span="12"
            class="text-blue"
          >
            <a :href="`tel:${message.contact.phone}`"> {{ message.contact.phone }}</a>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="23"
        class="section messageBody"
      >
        <div
          class="bold contactName"
        >
          {{ message.contact.firstname }} {{ message.contact.lastname }}
        </div>
        <!-- Better to avoid inline css but too specific to factorize in class -->
        <div
          style="margin-top: 12px;"
          class="text-light"
        >
          {{ formatDate(message.date) }}
        </div>
        <div
          style="margin-top: 35px;"
        >
          {{ message.body }}
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Moment from 'moment';

export default {
  name: 'MessageDetails',
  props: {
    message: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  methods: {
    formatDate(date) {
      // Prefer using built in locale format than a manual concatenation
      return new Moment(date).format('LLL');
    }
  }
};
</script>

<style lang="scss">
.section {
  padding: 20px;
  background-color: white;
  margin-bottom: 20px;
  margin-left: 7px;
}
.messageBody {
  padding-bottom: 50px;
}
.contactHeader {
  padding: 20px;
  margin-top: 20px;
  background-color: white;
  & > {
    .el-row {
      margin-top: 10px;
    }
  }
}
</style>

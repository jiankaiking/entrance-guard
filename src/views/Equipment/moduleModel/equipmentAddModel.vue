<template>
  <el-dialog title="设备信息 " :visible.sync="centerDialogVisible" width="30%" center>
    <el-form ref="form" label-width="120px" :model="modelFromdata" :rules="rules">
      <el-form-item label="设备厂家" prop="factoryId">
        <el-select v-model="modelFromdata.factoryId" clearable placeholder="请选择区域类型">
          <el-option v-for="(item,index) in factoryAllArr" :key="index" :label="item.value" :value="item.id + '-' + item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="设备名称" prop="equipmentName">
        <el-input v-model="modelFromdata.equipmentName" placeholder="输入设备名称" />
      </el-form-item>
      <el-form-item label="设备编号" prop="equipmentNo">
        <el-input v-model="modelFromdata.equipmentNo" placeholder="输入设备编号" />
      </el-form-item>
      <el-form-item label="设备类型" prop="equipmentTypeId">
        <el-select v-model="modelFromdata.equipmentTypeId" clearable placeholder="请选择区域类型">
          <el-option v-for="(item,index) in equipmentType" :key="index" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="IP地址" prop="ipAdress">
        <el-input v-model="modelFromdata.ipAdress" placeholder="输入IP地址" />
      </el-form-item>
      <el-form-item label="管理区域" prop="areaId">
        <el-cascader
          ref="cascader"
          v-model="modelFromdata.areaId"
          :options="options"
          :placeholder="modelFromdata.areaPidName"
          :props="{ checkStrictly: true,leaf:'haveLower',lazy:true,lazyLoad:loadSelect,label: 'treeName',value:'id', }"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="modelFromdata.detail"
          type="textarea"
          :autosize="{ minRows:4, maxRows: 5}"
          placeholder="请输入内容"
          maxlength="50"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="ok">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import httpRequest from '../../../api/api'
export default {
  props: {
    equipmentTypeArr: {
      type: Array
    },
    factoryArr: {
      type: Array
    }
  },
  data() {
    return {
      centerDialogVisible: false,
      modelFromdata: {
        equipmentTypeId: '',
        areaId: '',
        equipmentName: '',
        equipmentNo: '',
        factoryId: '',
        factoryName: '',
        ipAdress: '',
        detail: ''
      },
      rules: {
        equipmentTypeId: { required: true, message: '选择设备类型', trigger: 'change' },
        areaId: { required: true, message: '选择区域', trigger: 'blur' },
        equipmentName: { required: true, message: '输入设备名称', trigger: 'blur' },
        equipmentNo: { required: true, message: '输入设备编号', trigger: 'blur' },
        ipAdress: { required: true, message: '输入ip地址', trigger: 'blur' },
        factoryId: { required: true, message: '选择厂家', trigger: 'blur' }
      },
      url: {
        areaTree: '/property-manage/area/info/tree/area',
        areaTreeInfo: '/property-manage/area/info/tree',
        add: '/property-manage/equipment/info/insert',
        community: '/property-manage/community/info/list',
        edit: '/property-manage/equipment/info/update',
        factoryArr: '/property-manage/equipment/factory/info/list'
      },
      factoryAllArr: [],
      equipmentType: [],
      communityArr: [],
      options: []
    }
  },
  watch: {
    equipmentTypeArr: {
      handler(newValue) {
        this.equipmentType = newValue
      },
      deep: true
    },
    factoryArr: {
      handler(newValue) {
        this.factoryAllArr = newValue
      },
      deep: true
    }
  },
  methods: {
    modelDataClear() {
      Object.keys(this.modelFromdata).map(key => { this.modelFromdata[key] = '' })
    },
    edit(row) {
      this.add()
      // this.modelFromdata = Object.assign(this.modelFromdata,row)
      Object.keys(this.modelFromdata).map(key => {
        Object.keys(row).map(_key => {
          if (key === _key) {
            console.log(key, _key)
            this.modelFromdata[key] = row[_key]
          }
        })
      })
      this.modelFromdata.factoryId = `${row.factoryId}-${row.factoryName}`
      this.modelFromdata.id = row.id
    },
    // 机构树形
    loadSelect(node, resolve) {
      if (node.level === 0) {
        httpRequest(this.url.areaTreeInfo, 'GET')
          .then(res => {
            resolve(res.data)
          })
        return
      }
      const pid = node.data.id
      const url = this.url.areaTree
      httpRequest(url, 'GET', { pid: pid, level: node.level === 1 ? 0 : 1 })
        .then(res => {
          if (resolve) {
            resolve(res.data)
          }
        })
    },
    add() {
      this.modelDataClear()
      this.centerDialogVisible = true
    },
    ok() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.modelFromdata))
          const url = this.modelFromdata.id ? this.url.edit : this.url.add
          const f = this.modelFromdata.factoryId.split('-')
          data.factoryId = f[0]
          data.factoryName = f[1]
          data.areaId = this.modelFromdata.id ? this.modelFromdata.areaId : this.modelFromdata.areaId[2]
          console.log(data)
          httpRequest(url, 'post', data)
            .then((res) => {
              if (res.code === 200) {
                this.centerDialogVisible = false
                this.$emit('ok')
              }
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

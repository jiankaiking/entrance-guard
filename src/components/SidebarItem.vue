<template>
    <div v-if="item.children">
        <template v-if="item.children.length == 0">
            <el-menu-item :index="item.menuUrl">
                <i class="el-icon-menu"></i>
                {{item.menuName}}
            </el-menu-item>
        </template>

        <el-submenu v-else :index="item.menuUrl">
            <template slot="title">
                <i class="el-icon-menu"></i>
                {{item.menuName}}
            </template>
            <el-menu-item-group>
                <template v-for="child in item.children">
                    <sidebar-item
                            v-if="child.children&&child.children.length>0"
                            :item="child"
                            :key="child.menuUrl"/>
                    <el-menu-item v-else :key="child.menuUrl" :index="child.menuUrl">

                        {{child.menuName}}
                    </el-menu-item>
                </template>
            </el-menu-item-group>
        </el-submenu>
    </div>
</template>

<script>
    export default {
        name: 'SidebarItem',
        props: {
            item: {
                type: Object,
                required: true
            }
        }
    }
</script>

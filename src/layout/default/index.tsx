import { defineComponent } from "vue";
import { Layout } from 'ant-design-vue'
import LayoutContent from './content/index'
import LayoutSider from './sider/index'
import './index.less'

export default defineComponent({
  name: 'DefautlLayout',
  setup() {
    return () => {
      return <Layout class='tw-layout'>
        {/* <Layout.Header>header</Layout.Header> */}
        <Layout>
          <LayoutSider />
          <LayoutContent />
        </Layout>
      </Layout>
    }
  }
})

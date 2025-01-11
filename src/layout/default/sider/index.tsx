import { defineComponent, } from "vue"
import { LayoutSider, Menu, MenuItem } from 'ant-design-vue'
import { transformRouteToMenu } from './utils'
import { useGo } from '@h/web/usePage'


export default defineComponent({
  setup() {
    const { go } = useGo()
    const menus = transformRouteToMenu() as any[]

    const handleMenuClick = ({ key }) => {
      go(key)
    }

    return () => {
      return <LayoutSider>
        <Menu
          theme="dark"
          mode="inline"
          onClick={handleMenuClick}
          items={menus} />
      </LayoutSider>
    }
  }
})
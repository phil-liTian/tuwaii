import { defineComponent } from "vue";
import { LayoutContent } from 'ant-design-vue'
import PageLayout from '../../page/index.vue'

export default defineComponent({
  setup() {
    return () => <LayoutContent>
      <PageLayout />
    </LayoutContent>;
  }
})
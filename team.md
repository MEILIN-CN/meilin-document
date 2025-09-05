---
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: '/team/2.jpg',
    name: 'ArchiFei',
    title: '腐竹',
  },
  {
    avatar: '/team/1.jpg',
    name: 'ShodThrone57604',
    title: '腐竹',
  },
  {
    avatar: '/team/3.jpg',
    name: '清灵鸭-Touxsoft233',
    title: '腐竹',
  },
  {
    avatar: '/team/5.jpg',
    name: 'Slide2-shutdown歪优',
    title: '腐竹',
  },
  {
    avatar: '/team/4.jpg',
    name: 'hjm铭～',
    title: '管理',
  },
  {
    avatar: '/team/7.jpg',
    name: '冬烟mio',
    title: '技术',
  },
  {
    avatar: '/team/6.jpg',
    name: 'zzh4141',
    title: '技术',
  },

  
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      我们的团队
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>
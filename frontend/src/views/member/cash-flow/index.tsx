import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CardTitle, Container, Head, Item, SpanAlign } from './index.style'
import { getAssetsCashFlow } from '@/api/assets'
import { theme } from '@/global.style'
import Card from '@/components/card'
import dayjs from 'dayjs'

const Thead = () => (
  <Head>
    <SpanAlign align="left">日期</SpanAlign>
    <SpanAlign>類別</SpanAlign>
    <SpanAlign>名稱</SpanAlign>
    <SpanAlign align="right">數量</SpanAlign>
    <SpanAlign align="right">成本</SpanAlign>
  </Head>
)

const CashFlowTable = () => {
  const balance = useSelector((state: RootState) => state.balance)
  const [cashFlow, setCashFlow] = useState<CashFlowDetail[]>([])
  
  useEffect(() => {
    getCashFlow()
  }, [balance])

  async function getCashFlow () {
    const result = await getAssetsCashFlow()
    if (typeof result.result !== 'string') setCashFlow(result.result)
  }

  const cashFlowRender = () => cashFlow.map(item => (
    <Item key={item.id} style={{ color: item.type === 1 ? theme.colors.green : theme.colors.red }}>
      <SpanAlign align="left">{dayjs(item.time * 1000).format('YYYY/MM/DD HH:mm:ss')}</SpanAlign>
      <SpanAlign>{item.type === 1 ? '買入' : '賣出'}</SpanAlign>
      <SpanAlign>{item.name}</SpanAlign>
      <SpanAlign align="right">{item.amount}</SpanAlign>
      <SpanAlign align="right">${item.cost}</SpanAlign>
    </Item>
  ))

  return (
    <Container>
      { cashFlowRender() }
    </Container>
  )
}

const CashFlow = () => {
  return (
    <Card>
      <CardTitle>資金明細</CardTitle>
      <Thead />
      <CashFlowTable />
    </Card>
  )
}

export default CashFlow
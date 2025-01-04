import { FC, ReactNode } from 'react'
import { Descriptions, DescriptionsProps } from 'antd'
import { omit } from 'lodash'
import { ProblemDetail } from '@api/HttpClient'

export interface ProblemDetailWidgetProps {
  problemDetail?: ProblemDetail
}

export const ProblemDetailWidget: FC<ProblemDetailWidgetProps> = ({
  problemDetail,
}: ProblemDetailWidgetProps): ReactNode => {
  const items: DescriptionsProps['items'] = Object.entries(
    omit(problemDetail, 'type')
  ).map(([key, value]) => ({ key, label: key, children: value }))

  return <Descriptions items={items} size="small" column={1} />
}

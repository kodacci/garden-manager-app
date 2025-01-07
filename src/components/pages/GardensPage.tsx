import { FC, ReactNode, useMemo } from 'react'
import { GridItem, GridPage } from '@components/templates/GridPage'
import { useApiQuery } from '@hooks/useApiQuery'
import { useApi } from '@hooks/useApi'
import { GardenCard } from '@components/molecules/GardenCard'
import { GardenCreateForm } from '@components/molecules/GardenCreateForm'

export const GardensPage: FC = (): ReactNode => {
  const { isLoading, data } = useApiQuery(useApi().listGardens)

  const items = useMemo<GridItem[]>(() => {
    const cards = data?.map((garden) => ({
      id: garden.id,
      element: <GardenCard garden={garden} />,
    }))

    if (cards) {
      cards.push({ id: -1, element: <GardenCreateForm /> })
    }

    return cards ?? []
  }, [data])

  return <GridPage items={items ?? []} cols={2} isLoading={isLoading} />
}

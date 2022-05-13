import { EuiIcon, EuiTreeView } from '@elastic/eui'

function TreeView() {
    return (
        <EuiTreeView
            items={[
                {
                    label: 'Item One',
                    id: 'item_one',
                    icon: <EuiIcon type="arrowRight" />,
                    iconWhenExpanded: <EuiIcon type="arrowDown" />,
                    isExpanded: true,
                    children: [
                        {
                            label: 'Item A',
                            id: 'item_a',
                            icon: <EuiIcon type="document" />,
                        },
                        {
                            label: 'Item B',
                            id: 'item_b',
                            icon: <EuiIcon type="document" />,
                        },
                    ],
                },
                {
                    label: 'Item Two',
                    id: 'item_two',
                },
            ]}
            aria-label="Sample Tree View"
        />
    )
}

export { TreeView }

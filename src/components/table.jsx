import { Table, Pagination, IconButton } from 'rsuite';
import { Icon } from '@rsuite/icons';

import { useEffect, useState } from 'react';


const { Column, HeaderCell, Cell } = Table;

const MainTable = ({ update, dado, setDado, loadData, tableColumns, children }) => {

    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(30);

    useEffect(() => {
        setLoading(true)
        setDado(loadData(setDado))
        setTimeout(() => {
            setLoading(false);
            setSortColumn(sortColumn);
            setSortType(sortType);
        }, 500);
        // eslint-disable-next-line
    }, [update])

    const pegarDado = () => {
        if (dado.length > 0) {
            const dataf = dado.filter((v, i) => {
                const start = limit * (page - 1);
                const end = start + limit;
                return i >= start && i < end;
            });

            if (sortColumn && sortType) {
                return dataf.sort((a, b) => {
                    let x = a[sortColumn];
                    let y = b[sortColumn];
                    if (typeof x === 'string') {
                        x = x.charCodeAt();
                    }
                    if (typeof y === 'string') {
                        y = y.charCodeAt();
                    }
                    if (sortType === 'asc') {
                        return x - y;
                    } else {
                        return y - x;
                    }
                });
            }
            return dataf;
        }
    };

    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };

    const handleSortColumn = (sortColumn, sortType) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSortColumn(sortColumn);
            setSortType(sortType);
        }, 500);
    };

    return (
        <>
            <Table
                height={420}
                data={pegarDado()}
                sortType={sortType}
                onSortColumn={handleSortColumn}
                loading={loading}
            >
                {
                    Object.entries(tableColumns).map((key, index) => {
                        const coluna = {
                            titulo: key[0],
                            dataKey: key[1]['dataKey'],
                            width: key[1]['width'],
                            align: key[1]["align"],
                            fixed: key[1]["fixed"],
                            click: key[1]["click"],
                            icon: key[1]["icon"],
                            needAuth: key[1]["needAuth"] || false
                        }

                        if (coluna.needAuth) {
                            coluna.auth = key[1]["auth"]
                        }

                        return coluna.needAuth ? (
                            coluna.auth ? (
                                <Column width={coluna.width || 150} align={coluna.align || "center"} fixed={coluna.fixed || false} key={index} >
                                    <HeaderCell>{coluna.titulo}</HeaderCell>
                                    <Cell style={{ padding: '6px' }}>
                                        {rowData => {
                                            return <IconButton icon={<Icon as={coluna.icon} />} onClick={() => coluna.click(rowData)} />
                                        }}
                                    </Cell>
                                </Column>
                            ) : <></>
                        ) : (
                            coluna.dataKey === "botao" ? (
                                <Column width={coluna.width || 150} align={coluna.align || "center"} fixed={coluna.fixed || false} key={index} >
                                    <HeaderCell>{coluna.titulo}</HeaderCell>
                                    <Cell style={{ padding: '6px' }}>
                                        {rowData => {
                                            return <IconButton icon={<Icon as={coluna.icon} />} onClick={() => coluna.click(rowData)} />
                                        }}
                                    </Cell>
                                </Column>
                            ) :
                                (
                                    <Column width={coluna.width || 150} align={coluna.align || "center"} fixed={coluna.fixed || false} key={index} >
                                        <HeaderCell>{coluna.titulo}</HeaderCell>
                                        <Cell dataKey={coluna.dataKey} />
                                    </Column>
                                )
                        )

                    })
                }
            </Table >
            {children}
            < div style={{ padding: 20 }
            }>
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    maxButtons={5}
                    size="md"
                    layout={['total', '-', 'limit', '|', 'pager', '-', 'skip']}
                    total={dado.length}
                    limitOptions={[30, 50, 100]}
                    limit={limit}
                    activePage={page}
                    onChangePage={setPage}
                    onChangeLimit={handleChangeLimit}
                />
            </ div >
        </>
    );
};

export default MainTable;
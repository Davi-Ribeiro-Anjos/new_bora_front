import { Table, Pagination, IconButton } from 'rsuite';
import { Icon } from '@rsuite/icons';
import EditIcon from '@rsuite/icons/Edit';

import { useEffect, useState } from 'react';


const { Column, HeaderCell, Cell } = Table;

const MainTable = ({ data, setData, loadData, form, handleOpen, children }) => {
    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(30);

    useEffect(() => {
        setData(loadData(setData))
    }, [])

    const getData = () => {
        if (data.length > 0) {
            const dataf = data.filter((v, i) => {
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
                data={getData()}
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
                loading={loading}
            >
                {
                    Object.entries(form).map((key) => {
                        return (
                            <Column width={key[1]['width'] || 150} align={key[1]["align"] || "center"} sortable>
                                <HeaderCell>{key[0]}</HeaderCell>
                                <Cell dataKey={key[1]['dataKey']} />
                            </Column>
                        )
                    })
                }
                <Column width={80} fixed="right">
                    <HeaderCell>Editar</HeaderCell>

                    <Cell style={{ padding: '6px' }}>
                        {rowData => {
                            return (
                                <IconButton icon={<Icon as={EditIcon} />} onClick={() => handleOpen(rowData)} />
                            )
                        }}
                    </Cell>
                </Column>
            </Table >
            {children}
            < div style={{ padding: 20 }}>
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
                    total={data.length}
                    limitOptions={[30, 50, 100]}
                    limit={limit}
                    activePage={page}
                    onChangePage={setPage}
                    onChangeLimit={handleChangeLimit}
                />
            </ div>
        </>
    );
};

export default MainTable;
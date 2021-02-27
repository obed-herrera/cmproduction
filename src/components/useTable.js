import { Table, TableCell, TableRow, TableHead } from '@material-ui/core'
import React from 'react'

export default function useTable(records, headCells){

    const TblContainer = props => (
        <Table>
            {props.children}
        </Table>
    )

   /* const TbleHead = props => {
        return (<TableHead>
            <TableRow>
                {
                    headCells.map(headCell =>(<TableCell key ={headCell.id}>
                        {headCell.label}
                    </TableCell>))
                }
            </TableRow>
        </TableHead>)
    }*/

    return{
        TblContainer
    }
}
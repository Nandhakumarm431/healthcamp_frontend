import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { DownloadOutlined } from '@mui/icons-material';
import FileSaver from 'file-saver'

const UploadedFilesTable = ({ uploadedFiles, data }) => {

    const apiUrl = process.env.REACT_APP_API_URL;

    console.log('uploadedFiles', uploadedFiles);
    if (!uploadedFiles || uploadedFiles.length === 0) {
        return <p>No files uploaded yet.</p>;
    }
    const handleDownload = async (file) => {
        try {
            let payload = {
                "patientID": data.patientID,
                "fileName": file
            }
            const res = await fetch(`${apiUrl}/downloadreport`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                responseType: 'blob',
                body: JSON.stringify(payload),
            })
            console.log('result: ', res);
            if (res.ok) {
                const blob = await res.blob();
                const blobfile = new Blob([blob])
                FileSaver.saveAs(blobfile, file)
            }
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    }
    return (
        <TableContainer component={Paper} style={{ backgroundColor: 'whitesmoke' }}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead style={{ backgroundColor: 'ActiveBorder' }}>
                    <TableRow>
                        <TableCell style={{ color: 'white' }}>File Name</TableCell>
                        <TableCell style={{ color: 'white' }}>Description</TableCell>
                        <TableCell style={{ color: 'white' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {uploadedFiles.map((file) => (
                        <TableRow key={file.id}>
                            <TableCell>
                                {file.reportFileName != null && file.reportFileName.length > 25
                                    ? `${file.reportFileName.slice(0, 20)}...`
                                    : file.reportFileName}
                            </TableCell>
                            <TableCell>{file.description}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleDownload(file.reportFileName)}>
                                    <DownloadOutlined />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UploadedFilesTable;

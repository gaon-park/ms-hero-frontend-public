// ** React Imports
import { forwardRef } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Imports
import format from 'date-fns/format'
import { ApexOptions } from 'apexcharts'
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

interface PickerProps {
  start: Date | number
  end: Date | number
}

interface SeryType {
  name: string
  data: number[]
}

interface MainProps {
  startDate: Date
  endDate: Date
  setStartDate: (o: Date) => void
  setEndDate: (o: Date) => void
  options: ApexOptions
  series: SeryType[]
}

const ApexAreaChart = (mainProps: MainProps) => {

  const CustomInput = forwardRef((props: PickerProps, ref) => {
    const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return (
      <TextField
        {...props}
        size='small'
        value={value}
        inputRef={ref}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Icon icon='mdi:bell-outline' />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <Icon icon='mdi:chevron-down' />
            </InputAdornment>
          )
        }}
      />
    )
  })

  const handleOnChange = (dates: any) => {
    const [start, end] = dates
    mainProps.setStartDate(start)
    mainProps.setEndDate(end)
  }

  return (
    <Card>
      <CardHeader
        title='?????? ??????'
        subheader='2022/11/25?????? ??????????????? ????????? ?????? ?????? ????????? ?????? ??????(?????? ????????? 4?????? ????????? ??????, ?????? ???????????? ???????????????)'
        subheaderTypographyProps={{ sx: { color: theme => `${theme.palette.text.disabled} !important` } }}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
        action={
          <DatePickerWrapper>
            <DatePicker
              selectsRange
              endDate={mainProps.endDate}
              id='apexchart-area'
              selected={mainProps.startDate}
              startDate={mainProps.startDate}
              onChange={handleOnChange}
              placeholderText='?????? ??????'
              customInput={<CustomInput start={mainProps.startDate as Date | number} end={mainProps.endDate as Date | number} />}
            />
          </DatePickerWrapper>
        }
      />
      <CardContent>
        <ReactApexcharts type='line' height={400} options={mainProps.options} series={mainProps.series} />
      </CardContent>
    </Card>
  )
}

export default ApexAreaChart

import React, { useEffect, useState } from "react";
import { HistoricalData, OPTIONS, chartDays } from "../utils/constants";
import {
  CircularProgress,
  ThemeProvider,
  createTheme,
  styled,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import SelectedButton from "./SelectedButton";
import toast, { Toaster } from "react-hot-toast";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin, currency }) => {
  const [historical, SetHistorical] = useState([]);
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchHistoricalData = () => {
    fetch(HistoricalData(coin?.id, days, currency), OPTIONS)
      .then((respons) => respons.json())
      .then((res) => SetHistorical(res?.prices))
      .catch((err) => toast.success("Fetching the data, wait for a moment"));
  };

  useEffect(() => {
    setLoading(true);
    fetchHistoricalData();
    setLoading(false);
  }, [days, currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const ChartContainer = styled("div")(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 30,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
    },
  }));

  return (
    <ThemeProvider
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      theme={darkTheme}
    >
      <Toaster position="top-center" />
      <ChartContainer>
        {loading ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={150}
            thickness={1}
          />
        ) : (
          <>
            <Line
              style={{ marginTop: 20 }}
              data={{
                labels:
                  historical &&
                  historical.map((coin) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                        : `${date.getHours()}:${date.getMinutes()}`;

                    return days === 1 ? time : date.toLocaleDateString();
                  }),
                datasets: [
                  {
                    data: historical.map((coin) => coin[1]),
                    label: `Price (Past ${days} Days) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                marginTop: 40,
              }}
            >
              {chartDays.map((day) => (
                <SelectedButton
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                  key={day.value}
                >
                  {day.lable}
                </SelectedButton>
              ))}
            </div>
          </>
        )}
      </ChartContainer>
    </ThemeProvider>
  );
};

export default CoinInfo;

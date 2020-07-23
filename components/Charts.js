import { useEffect, useState } from "react";
import Chart from 'chart.js';
import StyledCharts from './styles/ChartStyles';
import { langColors } from "../utils";
import { theme } from "../styles";
const { fonts } = theme;
import { getRandomColor } from "../utils/utils";

const Charts = ({ langData, profileSummaryData, repoData }) => {
  useEffect(() => {
    initLineChart();
    initLangChart();
    initLangRepoChart();
    initRepoBarChart();
    initRepoCommitChart();
  }, []);

  const [langStarError, setLangStarError] = useState(false);
  const [langRepoError, setLangRepoError] = useState(false);
  const [repoCommitError, setRepoCommitError] = useState(false);

  const initLineChart = () => {
    const ctx = document.getElementById('quarterly_commits').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(profileSummaryData.quarterCommitCount),
        datasets: [
          {
            data: Object.values(profileSummaryData.quarterCommitCount),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 3,
            label: 'Commits',
            fill: 'start',
            showLine: true,
            spanGaps: true,
            lineTension: 0,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          mode: 'index',
          intersect: false,
          titleFontFamily: fonts.inter,
          bodyFontFamily: fonts.inter,
          cornerRadius: 3,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false //this will remove all the x-axis grid lines
          }]
        }
      }
    });
  };

  const initLangChart = () => {
    const ctx = document.getElementById('top_lang').getContext('2d');
    const langData = profileSummaryData.langStarCount;
    const showError = !Object.values(langData).filter(val => val > 0).length;
    if (showError) {
      setLangStarError(true);
      return;
    }
    const labels = Object.keys(langData);
    const data = Object.values(langData);


    new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: labels.map(label => langColors[label] ? langColors[label].color : '#ccc'),
            borderColor: '#fff',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          titleFontFamily: fonts.inter,
          bodyFontFamily: fonts.inter,
          cornerRadius: 3,
        },
        legend: {
          position: 'right',
          labels: {
            fontFamily: fonts.inter,
            usePointStyle: true,
          },
        }
      }
    });
  };

  const initLangRepoChart = () => {
    const ctx = document.getElementById('chart3-canvas');
    const langRepoData = profileSummaryData.langRepoCount;
    const LIMIT = 8;
    const labels = Object.keys(langRepoData).slice(0, LIMIT);
    const data = Object.values(langRepoData).slice(0, LIMIT);
    let colors = [];
    for (let label of labels) {
      let color = langColors[label] ? langColors[label].color : '#cccccc';
      colors.push(color);
    }
    if (!data || !data.length) {
      setLangRepoError(true);
      return;
    }
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: colors,
            borderWidth: 1,
            borderColor: '#fff'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'right',
          labels: {
            fontFamily: fonts.inter,
            usePointStyle: true,
          }
        }
      }
    });
  };

  const initRepoBarChart = () => {
    const ctx = document.getElementById('chart4-canvas');
    const mostStarred = repoData.filter(repo => !repo.fork).sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5);
    const labels = mostStarred.map(repo => repo.name);
    const data = mostStarred.map(repo => repo.stargazers_count);
    const backgroundColor = [
      'rgba(255, 99, 132, 0.5)',
      'rgba(54, 162, 235, 0.5)',
      'rgba(255, 206, 86, 0.5)',
      'rgba(75, 192, 192, 0.5)',
      'rgba(153, 102, 255, 0.5)',
      'rgba(255, 159, 64, 0.5)'
    ];
    const borderColor = [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ];
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              ticks: {
                fontFamily: fonts.inter,
                fontSize: 12,
                minRotation: 50
              },
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontFamily: fonts.inter,
                fontSize: 12,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        tooltips: {
          titleFontFamily: fonts.inter,
          bodyFontFamily: fonts.inter,
          cornerRadius: 3,
        }
      }
    });
  };

  const initRepoCommitChart = () => {
    const ctx = document.getElementById('chart5-canvas');
    const langRepoData = profileSummaryData.repoCommitCount;
    const LIMIT = 8;
    const labels = Object.keys(langRepoData).slice(0, LIMIT);
    // .map(label => {
    //   return label.length > 10 ? label.slice(0, 17) + '...' : label;
    // });
    const data = Object.values(langRepoData).slice(0, LIMIT);
    const backgroundColor = labels.map(l => getRandomColor());

    if (!data || !data.length) {
      setRepoCommitError(true);
      return;
    }

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor,
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'right',
          labels: {
            usePointStyle: true,
            generateLabels: (chart) => {
              let data = chart.data;
              if (data.labels.length && data.datasets.length) {
                return data.labels.map(function (label, i) {
                  let meta = chart.getDatasetMeta(0);
                  let ds = data.datasets[0];
                  let arc = meta.data[i];
                  let custom = arc && arc.custom || {};
                  let getValueAtIndexOrDefault = Chart.helpers.getValueAtIndexOrDefault;
                  let arcOpts = chart.options.elements.arc;
                  let fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
                  let stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
                  let bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);

                  return {
                    text: label.length > 20 ? label.slice(0, 17) + '...' : label,
                    fillStyle: fill,
                    strokeStyle: stroke,
                    lineWidth: bw,
                    hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                    index: i
                  };
                });
              } else {
                return [];
              }
            }
          },
        }
      }
    });
  };

  const chartSize = 300;

  return (
    <StyledCharts>
      <div className="chart chart-1">
        <header>Commits Per Quarter</header>
        <div className="chart__canvas">
          <canvas id="quarterly_commits" />
        </div>
      </div>
      <div className="chart chart-2">
        <header>Stars Per Language</header>
        <div className={langStarError ? "chart__canvas error" : "chart__canvas"}>
          {langStarError ? (
            <p className="nodata-msg">Not enough data!</p>
          ) : (
              <canvas id="top_lang" width={chartSize} height={chartSize} />
            )}
        </div>
      </div>
      <div className="chart chart-3">
        <header>Repos Per Language</header>
        <div className={langRepoError ? "chart__canvas error" : "chart__canvas"}>
          {langRepoError ? (
            <p className="nodata-msg">Not enough data!</p>
          ) : (
              <canvas id="chart3-canvas" width={chartSize} height={chartSize} />
            )}
        </div>
      </div>
      <div className="chart chart-4">
        <header>Most starred Repos</header>
        <div className="chart__canvas">
          <canvas id="chart4-canvas" height="300" width={chartSize} height={chartSize} />
        </div>
      </div>
      <div className="chart chart-5">
        <header>Commits Per Repo</header>
        <div className={repoCommitError ? "chart__canvas error" : "chart__canvas"}>
          {repoCommitError ? (
            <p className="nodata-msg">Not enough data!</p>
          ) : (
              <canvas id="chart5-canvas" width={chartSize} height={chartSize} />
            )}
        </div>
      </div>
    </StyledCharts>
  )
}

export default Charts;
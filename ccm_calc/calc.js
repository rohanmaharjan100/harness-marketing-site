function formatNumber(num) {
  const strNum = num.toString();
  const lclStrNum = num.toLocaleString();

  // If the number has fewer than 9 digits, return it as is
  if (strNum.length < 9) return lclStrNum;

  // Abbreviate billions and trillions with two decimal points
  if (num < 1000000000000) return (num / 1000000000).toFixed(2) + "B";
  return (num / 1000000000000).toFixed(2) + "T";
}
function calculateAws(awsContainer) {
  let data = [];
  function GetValues(input) {
    let obj = {};
    const name = input.getAttribute("name");
    const value = input.value;
    obj.name = name;
    obj.value = parseInt(value);
    data.push(obj);
  }

  const slider = document.querySelector(
    'input[name="Total_Coverage_including_Commitment_Orchestrator"]'
  );
  if (slider.value > 70) {
    slider.value = 70;
  }

  const inputEL = awsContainer.querySelectorAll("input");
  inputEL.forEach((input) => {
    input.addEventListener("input", GetValues(input));
    if (
      data[0] &&
      data[1] &&
      data[2] &&
      data[3] &&
      data[4] &&
      data[5] &&
      data[6] &&
      data[7] &&
      data[8] &&
      data[9] &&
      data[10] &&
      data[11] &&
      data[12] &&
      data[13] &&
      data[14]
    ) {
      const EC2_Spend = parseInt(data[0].value); //B4
      const AWS_SLR_EC2 = parseInt(data[1].value) / 100; //B5

      const RDS_Spend = parseInt(data[6].value); //b6
      const AWS_SLR_RDS = parseInt(data[7].value) / 100; //B7

      const ASG_Spend = parseInt(data[2].value); //b8
      const AWS_SLR_ASG = parseInt(data[3].value) / 100; //B9

      const EKS_Spend = parseInt(data[4].value); //b10
      const AWS_SLR_EKS = parseInt(data[5].value) / 100; //B11

      const ECS_Spend = parseInt(data[8].value); //b12
      const AWS_SLR_ECS = parseInt(data[9].value) / 100; //B13

      const reserved_instances_or_savings_plans_percent =
        parseInt(data[10].value) / 100; //b15

      const production_Spend_percent = parseInt(data[11].value) / 100; //b16

      let Total_Coverage_including_Commitment_Orchestrator =
        parseInt(data[12].value) / 100;

      // latest 27
      const AutoStopping_Saving_Percent = parseInt(data[13].value) / 100; // latest 29
      const Cluster_Orchestrator_Spot_Savings_Percent =
        parseInt(data[14].value) / 100; // latest 31

      const total_spend =
        EC2_Spend + RDS_Spend + ASG_Spend + EKS_Spend + ECS_Spend; //B14

      const non_production_Spend = Math.round(
        (1 - production_Spend_percent) * total_spend
      ); // latest B17

      const Total_Non_Production_Spend_on_Short_lived_resources = Math.round(
        (AWS_SLR_EC2 * EC2_Spend +
          RDS_Spend * AWS_SLR_RDS +
          ASG_Spend * AWS_SLR_ASG +
          EKS_Spend * AWS_SLR_EKS +
          ECS_Spend * AWS_SLR_ECS) *
          (1 - production_Spend_percent)
      ); // latest B18

      const Additional_Coverage_from_Commitment_Orchestrator = 0.1;
      // latest B19

      const Saving_Percent_From_Commitment_Orchestrator = 0.3; // latest B20
      const Saving_Percent_From_Cluster_Orchestrator = 0.3; // latest B21

      //  <-- ASSUMPTION FOR AWS START HERE-->

      const Additional_Savings_from_Commitment_Orchestrator = Math.round(
        Additional_Coverage_from_Commitment_Orchestrator *
          total_spend *
          Saving_Percent_From_Commitment_Orchestrator
      ); //  latest B26

      if (Total_Coverage_including_Commitment_Orchestrator > 0.7) {
        Total_Coverage_including_Commitment_Orchestrator = 0.7;
      }

      const Total_Non_Production_On_demand_Spend_on_Short_lived_Resources =
        (1 - Total_Coverage_including_Commitment_Orchestrator) *
        Total_Non_Production_Spend_on_Short_lived_resources; // latest 28

      const AutoStopping_Saving = Math.round(
        Total_Non_Production_On_demand_Spend_on_Short_lived_Resources *
          AutoStopping_Saving_Percent
      ); // latest 30

      const Additional_Saving_From_Cluster_Orchestrator = Math.round(
        Saving_Percent_From_Cluster_Orchestrator *
          EKS_Spend *
          (1 - production_Spend_percent) *
          Cluster_Orchestrator_Spot_Savings_Percent *
          (1 - reserved_instances_or_savings_plans_percent)
      ); //latest 32

      const Total_saving = Math.round(
        AutoStopping_Saving +
          Additional_Savings_from_Commitment_Orchestrator +
          Additional_Saving_From_Cluster_Orchestrator
      ); // latest 34

      const CommitmentOrchestrator = document.getElementById(
        "commitment-orchestrator"
      );
      CommitmentOrchestrator.style.display = "flex";
      const ClusterOrchestrator = document.getElementById(
        "cluster-orchestrator"
      );
      ClusterOrchestrator.style.display = "flex";

      const autoStopping = document.getElementById("autoStopping");
      autoStopping.innerText = "$" + formatNumber(AutoStopping_Saving);
      const commitmentOrchestrator = document.getElementById(
        "commitmentOrchestrator"
      );
      commitmentOrchestrator.innerText =
        "$" + formatNumber(Additional_Savings_from_Commitment_Orchestrator);
      const clusterOrchestrator = document.getElementById(
        "clusterOrchestrator"
      );

      clusterOrchestrator.innerText =
        "$" + formatNumber(Additional_Saving_From_Cluster_Orchestrator);
      const saving = document.getElementById("saving");
      saving.innerText = "$" + formatNumber(Total_saving);
      const spend_after_savings =
        total_spend -
        (AutoStopping_Saving + Additional_Savings_from_Commitment_Orchestrator);
      function updateChartData(newData) {
        myChart.data.datasets[0].data = newData;
        myChart.update();
      }
      const newData = [
        AutoStopping_Saving,
        Additional_Savings_from_Commitment_Orchestrator,
        Additional_Saving_From_Cluster_Orchestrator,
        spend_after_savings,
      ];
      updateChartData(newData);
    }
  });
}

let myChart; // Declare a variable to store the chart instance

const ctx = document.getElementById("doughnut-chart");

function createChart(initialData) {
  myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: [
        "AutoStopping",
        "Commitment Orchestrator",
        "Cluster Orchestrator",
        "Spend after savings",
      ],
      datasets: [
        {
          backgroundColor: ["#01C9CC", "#AADC72", "#0D98BA", "#383946"],
          data: initialData,
        },
      ],
    },
    options: {
      cutout: "85%",
      aspectRatio: 1,
      elements: {
        arc: {
          borderWidth: 0,
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";

              if (label) {
                label += ": ";
              }
              if (context.parsed !== null) {
                label += new Intl.NumberFormat("en-US", {
                  style: "currency",
                  maximumFractionDigits: 0,
                  currency: "USD",
                }).format(context.parsed);
              }
              return label;
            },
          },
        },
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
      },
    },
  });
}

// Create the initial chart with some data
createChart([19000, 10000, 19000, 19000]);

function calculateAzure(azureContainer) {
  let data = [];
  function GetValues(input) {
    let obj = {};
    const name = input.getAttribute("name");
    const value = parseInt(input.value);
    obj.name = name;
    obj.value = value;
    data.push(obj);
  }
  const inputEL = azureContainer.querySelectorAll("input");
  inputEL.forEach((input) => {
    input.addEventListener("input", GetValues(input));
    if (
      data[0] &&
      data[1] &&
      data[2] &&
      data[3] &&
      data[4] &&
      data[5] &&
      data[6] &&
      data[7]
    ) {
      const VM_Spend = parseInt(data[0].value); //B55
      const GCP_SLR_VM = parseInt(data[1].value) / 100; //B56
      const GKE_Spend = parseInt(data[2].value); //b57
      const GCP_SLR_GKE = parseInt(data[3].value) / 100; //B58
      const total_spend = VM_Spend + GKE_Spend; //B59  = B55 + B57
      const reserved_instances_or_savings_plans_percent =
        parseInt(data[4].value) / 100; //B60
      const production_Spend_percent = parseInt(data[5].value) / 100; //B61
      const non_production_Spend = (1 - production_Spend_percent) * total_spend; //B62

      const non_production_Spend_on_shortLived_resources =
        (VM_Spend * GCP_SLR_VM + GKE_Spend * GCP_SLR_GKE) *
        (1 - production_Spend_percent); // B63

      const non_production_On_Demand_Spend_on_shortLived_resources =
        (1 - reserved_instances_or_savings_plans_percent) *
        non_production_Spend_on_shortLived_resources; // B68

      const AutoStopping_Saving_Percent = 0.7; // B69
      const AutoStopping_Saving = Math.round(
        non_production_On_Demand_Spend_on_shortLived_resources *
          AutoStopping_Saving_Percent
      ); // 68*69 = 70

      const Total_saving = AutoStopping_Saving; //B71

      const autoStopping = document.getElementById("autoStopping");
      autoStopping.innerText = "$" + formatNumber(AutoStopping_Saving);
      const saving = document.getElementById("saving");
      saving.innerText = "$" + formatNumber(Total_saving);
      const spend_after_savings = total_spend - AutoStopping_Saving;
      function updateChartData(newData) {
        myChart.data.datasets[0].data = newData;
        myChart.update();
      }

      const commitmentOrchestrator = document.getElementById(
        "commitment-orchestrator"
      );
      commitmentOrchestrator.style.display = "none";
      const clusterOrchestrator = document.getElementById(
        "cluster-orchestrator"
      );
      clusterOrchestrator.style.display = "none";

      const newData = [AutoStopping_Saving, 0, 0, spend_after_savings];
      updateChartData(newData);
    }
  });
}
function calculateGcp(gcpContainer) {
  let data = [];
  function GetValues(input) {
    let obj = {};
    const name = input.getAttribute("name");
    const value = parseInt(input.value);
    obj.name = name;
    obj.value = value;
    data.push(obj);
  }
  const inputEL = gcpContainer.querySelectorAll("input");
  inputEL.forEach((input) => {
    input.addEventListener("input", GetValues(input));
    if (
      data[0] &&
      data[1] &&
      data[2] &&
      data[3] &&
      data[4] &&
      data[5] &&
      data[6] &&
      data[7]
    ) {
      const VM_Spend = parseInt(data[0].value); //B55
      const GCP_SLR_VM = parseInt(data[1].value) / 100; //B56
      const GKE_Spend = parseInt(data[2].value); //b57
      const GCP_SLR_GKE = parseInt(data[3].value) / 100; //B58
      const total_spend = VM_Spend + GKE_Spend; //B59  = B55 + B57
      const reserved_instances_or_savings_plans_percent =
        parseInt(data[4].value) / 100; //B60
      const production_Spend_percent = parseInt(data[5].value) / 100; //B61
      const non_production_Spend = (1 - production_Spend_percent) * total_spend; //B62

      const non_production_Spend_on_shortLived_resources =
        (VM_Spend * GCP_SLR_VM + GKE_Spend * GCP_SLR_GKE) *
        (1 - production_Spend_percent); // B63

      const non_production_On_Demand_Spend_on_shortLived_resources =
        (1 - reserved_instances_or_savings_plans_percent) *
        non_production_Spend_on_shortLived_resources; // B68

      const AutoStopping_Saving_Percent = 0.7; // B69
      const AutoStopping_Saving = Math.round(
        non_production_On_Demand_Spend_on_shortLived_resources *
          AutoStopping_Saving_Percent
      ); // 68*69 = 70

      const Total_saving = AutoStopping_Saving; //B71

      const autoStopping = document.getElementById("autoStopping");
      autoStopping.innerText = "$" + formatNumber(AutoStopping_Saving);
      const saving = document.getElementById("saving");
      saving.innerText = "$" + formatNumber(Total_saving);
      const spend_after_savings = total_spend - AutoStopping_Saving;
      function updateChartData(newData) {
        myChart.data.datasets[0].data = newData;
        myChart.update();
      }
      const newData = [AutoStopping_Saving, 0, 0, spend_after_savings];
      const commitmentOrchestrator = document.getElementById(
        "commitment-orchestrator"
      );
      commitmentOrchestrator.style.display = "none";
      const clusterOrchestrator = document.getElementById(
        "cluster-orchestrator"
      );
      clusterOrchestrator.style.display = "none";
      updateChartData(newData);
    }
  });
}

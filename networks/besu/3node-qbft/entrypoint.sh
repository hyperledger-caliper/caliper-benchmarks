#!/bin/bash
: "${CONFIG_YAML:=benchmarks/scenario/simple/config.yaml}"
: "${DELAY:=60}"
# Replace the BOOTNODE_URL placeholder in networkconfig.template.json

echo "Starting the benchmark script with the following parameters:"
echo "CONFIG_YAML: ${CONFIG_YAML:=benchmarks/scenario/simple/config.yaml}"
echo "DELAY: ${DELAY:=60}"

sleep ${DELAY}
npx caliper --help
# Run the caliper benchmark
npx caliper launch manager \
  --caliper-benchconfig ${CONFIG_YAML} \
  --caliper-networkconfig networks/networkconfig.json \
  --caliper-workspace . \
  --caliper-report-path results/report.html
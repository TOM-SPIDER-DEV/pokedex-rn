import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Stat } from "../../types";
export default function Stats({ stats }: { stats: Stat[] }) {
  const barStyles = (num: number) => {
    let bgColorized;

    if (num <= 25) {
      bgColorized = "#ff3e3e";
    } else if (num > 25 && num < 50) {
      bgColorized = "#F08700";
    } else if (num >= 50 && num < 75) {
      bgColorized = "#EFCA08";
    } else if (num >= 75) {
      bgColorized = "#6EEB83";
    }
    if (num > 100) {
      num = 100;
    }
    return {
      backgroundColor: bgColorized,
      width: num + "%",
    };
  };

  return (
    <View style={styles.container}>
      {stats.map((stat) => (
        <View key={stat.stat.name} style={styles.statContainer}>
          <Text style={styles.statName}>{stat.stat.name}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progress, barStyles(stat.base_stat)]} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 20,
    marginBottom: 20,
    justifyContent: "center",
    flexDirection: "column",
  },
  statContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    margin: 10,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  progressBar: {
    flexDirection: "column",
    height: 20,
    width: 200,
    backgroundColor: "#e0e0de",
    borderRadius: 5,
    marginRight: 10,
  },
  progress: {
    backgroundColor: "#ff0000",
    overflow: "hidden",
    height: 20,
    borderRadius: 5,
  },
});

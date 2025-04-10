package backend;

import java.io.*;
import java.nio.file.*;
import java.util.*;
import com.google.gson.*;

public class dataProcessor {
    public static void main(String[] args) {
        String inputPath = "backend/owid-covid-data.csv";
        String outputPath = "backend/data.json";
        Map<String, List<Map<String, Object>>> countryDataMap = new HashMap<>();

        try (BufferedReader br = Files.newBufferedReader(Paths.get(inputPath))) {
            String header = br.readLine(); // Skip the header
            if (header == null) {
                System.err.println("CSV file is empty.");
                return;
            }

            String line;
            while ((line = br.readLine()) != null) {
                String[] cols = parseCSVLine(line);
                if (cols.length < 10) continue;

                String country = cols[2].trim(); // location
                String date = cols[3].trim();    // date
                int confirmed = parseInt(cols[4]); // total_cases
                int deaths = parseInt(cols[8]);    // total_deaths
                int recovered = parseInt(cols[9]); // total_recovered (if available)

                Map<String, Object> dailyData = new HashMap<>();
                dailyData.put("date", date);
                dailyData.put("confirmed", confirmed);
                dailyData.put("recovered", recovered);
                dailyData.put("deaths", deaths);

                countryDataMap.computeIfAbsent(country, k -> new ArrayList<>()).add(dailyData);
            }

            // Write JSON output
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String jsonOutput = gson.toJson(countryDataMap);
            Files.write(Paths.get(outputPath), jsonOutput.getBytes());

            System.out.println("✅ data.json has been generated successfully!");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Helper to parse integer fields safely
    private static int parseInt(String s) {
        try {
            return (int) Double.parseDouble(s);
        } catch (Exception e) {
            return 0;
        }
    }

    // Helper to parse CSV with quotes or commas properly
    private static String[] parseCSVLine(String line) {
        List<String> tokens = new ArrayList<>();
        StringBuilder sb = new StringBuilder();
        boolean inQuotes = false;

        for (char c : line.toCharArray()) {
            if (c == '\"') {
                inQuotes = !inQuotes;
            } else if (c == ',' && !inQuotes) {
                tokens.add(sb.toString());
                sb.setLength(0);
            } else {
                sb.append(c);
            }
        }
        tokens.add(sb.toString());
        return tokens.toArray(new String[0]);
    }
}

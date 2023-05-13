package com.example.epicambulance.User;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationManager;
import android.os.Bundle;
import android.os.Looper;
import android.provider.Settings;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;
import com.example.epicambulance.Classes.API;
import com.example.epicambulance.R;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class HospitalsActivity extends AppCompatActivity {

    private ListView listView;
    private EditText searchValue;
    private ArrayList<Hospital> detailsArrayList = new ArrayList<>();
    private ArrayList<Hospital> detailsArrayList2 = new ArrayList<>();

    FusedLocationProviderClient fusedLocationClient;
    double latitude = 0.0, longitude = 0.0;
    int PERMISSION_ID = 44;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_hospitals);

        listView = findViewById(R.id.listView);
        searchValue = findViewById(R.id.searchValue);

        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);

        // method to get the location
        getLastLocation();

        showDetails();

        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int i, long id) {

                String selected = String.valueOf(detailsArrayList.get(i).getId());

                Intent intent = new Intent(HospitalsActivity.this, HospitalDetailsViewActivity.class);
                intent.putExtra("id", selected);
                intent.putExtra("latitude", latitude);
                intent.putExtra("longitude", longitude);
                intent.putExtra("distance", detailsArrayList.get(i).getDistance());
                startActivity(intent);

            }
        });

        searchValue.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                searchDetails(charSequence.toString().toLowerCase());
            }

            @Override
            public void afterTextChanged(Editable editable) {

            }
        });

    }

    private void showDetails()
    {
        if (latitude != 0.0 && longitude != 0.0) {

            String URL = API.HOSPITALS_API + "/search?latitude=" + latitude + "&longitude=" + longitude;

            RequestQueue requestQueue = Volley.newRequestQueue(HospitalsActivity.this);
            JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(
                    Request.Method.GET,
                    URL,
                    null,
                    new Response.Listener<JSONArray>() {
                        @Override
                        public void onResponse(JSONArray response) {

                            try {
                                detailsArrayList.clear();
                                detailsArrayList2.clear();
                                listView.setAdapter(null);

                                HospitalAdapter hospitalAdapter = new HospitalAdapter(HospitalsActivity.this, R.layout.row_hospitals_item, detailsArrayList);
                                listView.setAdapter(hospitalAdapter);

                                for (int index = 0; index < response.length(); index++) {

                                    JSONObject responseData = response.getJSONObject(index);

                                    String id = (String) responseData.getString("id");
                                    String name = (String) responseData.getString("name");
                                    String type = (String) responseData.getString("type");
                                    String address = (String) responseData.getString("address");
                                    String distance = (String) responseData.getString("distance");

                                    if (!detailsArrayList.contains(new Hospital(id, name, type, address, distance))) {
                                        detailsArrayList.add(new Hospital(id, name, type, address, distance));
                                        detailsArrayList2.add(new Hospital(id, name, type, address, distance));
                                    }

                                }

                                hospitalAdapter.notifyDataSetChanged();

                            } catch (JSONException e) {
                                e.printStackTrace();
                            }

                        }
                    },
                    new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            Toast.makeText(HospitalsActivity.this, error.toString(),Toast.LENGTH_SHORT).show();
                        }
                    }

            );

            requestQueue.add(jsonArrayRequest);

        }

    }

    private void searchDetails(String value)
    {

        detailsArrayList.clear();
        listView.setAdapter(null);

        HospitalAdapter hospitalAdapter = new HospitalAdapter(this, R.layout.row_hospitals_item, detailsArrayList);
        listView.setAdapter(hospitalAdapter);

        if (!value.equals("")) {
            for (int i = 0; i < detailsArrayList2.size(); i++) {
                if (
                        detailsArrayList2.get(i).getName().toLowerCase().contains(value) ||
                        detailsArrayList2.get(i).getAddress().toLowerCase().contains(value) ||
                        detailsArrayList2.get(i).getDistance().toLowerCase().contains(value)
                ) {
                    detailsArrayList.add(detailsArrayList2.get(i));
                }
            }
        } else {
            for (int i = 0; i < detailsArrayList2.size(); i++) {
                detailsArrayList.add(detailsArrayList2.get(i));
            }
        }

        hospitalAdapter.notifyDataSetChanged();
    }

    @SuppressLint("MissingPermission")
    private void getLastLocation() {
        // check if permissions are given
        if (checkPermissions()) {

            // check if location is enabled
            if (isLocationEnabled()) {

                // getting last
                // location from
                // FusedLocationClient
                // object
                fusedLocationClient.getLastLocation().addOnCompleteListener(new OnCompleteListener<Location>() {
                    @Override
                    public void onComplete(@NonNull Task<Location> task) {
                        Location location = task.getResult();
                        if (location == null) {
                            requestNewLocationData();
                            showDetails();
                        } else {
                            latitude = location.getLatitude();
                            longitude = location.getLongitude();

                            showDetails();
                        }
                    }
                });
            } else {
                Toast.makeText(this, "Please turn on" + " your location...", Toast.LENGTH_LONG).show();
                Intent intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
                startActivity(intent);
            }
        } else {
            // if permissions aren't available,
            // request for permissions
            requestPermissions();
        }
    }

    @SuppressLint("MissingPermission")
    private void requestNewLocationData() {

        // Initializing LocationRequest
        // object with appropriate methods
        LocationRequest mLocationRequest = new LocationRequest();
        mLocationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
        mLocationRequest.setInterval(5);
        mLocationRequest.setFastestInterval(0);
        mLocationRequest.setNumUpdates(1);

        // setting LocationRequest
        // on FusedLocationClient
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
        fusedLocationClient.requestLocationUpdates(mLocationRequest, mLocationCallback, Looper.myLooper());
    }

    private LocationCallback mLocationCallback = new LocationCallback() {

        @Override
        public void onLocationResult(LocationResult locationResult) {
            Location mLastLocation = locationResult.getLastLocation();
            latitude = mLastLocation.getLatitude();
            longitude = mLastLocation.getLongitude();

            showDetails();
        }
    };

    // method to check for permissions
    private boolean checkPermissions() {
        return ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED;

        // If we want background location
        // on Android 10.0 and higher,
        // use:
        // ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_BACKGROUND_LOCATION) == PackageManager.PERMISSION_GRANTED
    }

    // method to request for permissions
    private void requestPermissions() {
        ActivityCompat.requestPermissions(this, new String[]{
                Manifest.permission.ACCESS_COARSE_LOCATION,
                Manifest.permission.ACCESS_FINE_LOCATION}, PERMISSION_ID);
    }

    // method to check
    // if location is enabled
    private boolean isLocationEnabled() {
        LocationManager locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        return locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER) || locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);
    }

    // If everything is alright then
//    @Override
//    public void
//    onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
//        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
//
//        if (requestCode == PERMISSION_ID) {
//            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
//                getLastLocation();
//            }
//        }
//    }

    @Override
    public void onResume() {
        super.onResume();
        if (checkPermissions()) {
            getLastLocation();
        }
    }

}

class Hospital {

    String id, name, type, address, distance;

    public Hospital(String id, String name, String type, String address, String distance) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.address = address;
        this.distance = distance;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public String getAddress() {
        return address;
    }

    public String getDistance() {
        return distance;
    }
}

class HospitalAdapter extends ArrayAdapter<Hospital> {

    private Context mContext;
    private int mResource;

    public HospitalAdapter(@NonNull Context context, int resource, @NonNull ArrayList<Hospital> objects) {
        super(context, resource, objects);

        this.mContext = context;
        this.mResource = resource;
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        LayoutInflater layoutInflater = LayoutInflater.from(mContext);
        convertView = layoutInflater.inflate(mResource, parent, false);

        TextView title = (TextView) convertView.findViewById(R.id.title);
        TextView address = (TextView) convertView.findViewById(R.id.address);
        TextView type = (TextView) convertView.findViewById(R.id.type);
        TextView distance = (TextView) convertView.findViewById(R.id.distance);

        title.setText(getItem(position).getName());
        address.setText(getItem(position).getAddress());
        type.setText(getItem(position).getType());
        distance.setText(getItem(position).getDistance());

        return convertView;
    }

}
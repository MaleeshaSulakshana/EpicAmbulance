package com.example.epicambulance.Ambulance;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.example.epicambulance.Classes.API;
import com.example.epicambulance.Classes.Preferences;
import com.example.epicambulance.R;
import com.example.epicambulance.User.ProfileActivity;
import com.example.epicambulance.User.PswChangeActivity;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;

public class AmbulanceProfileActivity extends AppCompatActivity {

    private TextView textPswChange;
    private EditText name, nic, number, address, hospitalName, hospitalType, hospitalAddress, hospitalNumber, ambulanceNo, ambulanceType;
    private ImageView showLocation;
    private String mapUrl = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ambulance_profile);

        textPswChange = (TextView) this.findViewById(R.id.textPswChange);

        showLocation = (ImageView) this.findViewById(R.id.showLocation);

        name = (EditText) this.findViewById(R.id.name);
        nic = (EditText) this.findViewById(R.id.nic);
        number = (EditText) this.findViewById(R.id.number);
        address = (EditText) this.findViewById(R.id.address);
        hospitalName = (EditText) this.findViewById(R.id.hospitalName);
        hospitalType = (EditText) this.findViewById(R.id.hospitalType);
        hospitalAddress = (EditText) this.findViewById(R.id.hospitalAddress);
        hospitalNumber = (EditText) this.findViewById(R.id.hospitalNumber);
        ambulanceNo = (EditText) this.findViewById(R.id.ambulanceNo);
        ambulanceType = (EditText) this.findViewById(R.id.ambulanceType);

        getProfileData();

        textPswChange.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(AmbulanceProfileActivity.this, AmbulancePswChangeActivity.class);
                startActivity(intent);

            }
        });

        showLocation.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if (!mapUrl.equals("")) {
                    openBrowser(mapUrl);
                }

            }
        });

    }

    //    Function for get profile details
    private void getProfileData() {

        String URL = API.CREW_MEMBER_API + "/" + Preferences.LOGGED_USER_ID;

        RequestQueue requestQueue = Volley.newRequestQueue(AmbulanceProfileActivity.this);
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(
                Request.Method.GET,
                URL,
                null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {

                        try {

                            String strName = (String) response.getString("name");
                            String strNic = (String) response.getString("nic");
                            String strNumber = (String) response.getString("tpNumber");
                            String strAddress = (String) response.getString("address");

                            JSONObject hospital = (JSONObject) response.getJSONObject("hospital");
                            String strHospitalName = (String) hospital.getString("name");
                            String strHospitalType = (String) hospital.getString("type");
                            String strHospitalAddress = (String) hospital.getString("address");
                            String strHospitalNumber = (String) hospital.getString("tpNumber");
                            String map = (String) hospital.getString("mapUrl");
                            mapUrl = map;

                            JSONObject ambulance = (JSONObject) response.getJSONObject("ambulance");
                            String strAmbulanceNo = (String) ambulance.getString("vehicleNo");
                            String strAmbulanceType = (String) ambulance.getString("type");

                            name.setText(strName);
                            nic.setText(strNic);
                            number.setText(strNumber);
                            address.setText(strAddress);
                            hospitalName.setText(strHospitalName);
                            hospitalType.setText(strHospitalType);
                            hospitalAddress.setText(strHospitalAddress);
                            hospitalNumber.setText(strHospitalNumber);
                            ambulanceNo.setText(strAmbulanceNo);
                            ambulanceType.setText(strAmbulanceType);

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(AmbulanceProfileActivity.this, error.toString(),Toast.LENGTH_SHORT).show();
                    }
                }

        );

        requestQueue.add(jsonObjectRequest);

    }

    private void openBrowser(String link)
    {
        Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(link));
        startActivity(browserIntent);
    }

}
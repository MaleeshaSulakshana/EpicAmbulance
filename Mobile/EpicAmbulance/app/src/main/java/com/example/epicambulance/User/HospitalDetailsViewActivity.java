package com.example.epicambulance.User;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.epicambulance.Classes.API;
import com.example.epicambulance.R;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class HospitalDetailsViewActivity extends AppCompatActivity {

    private Button btnBooking;
    private ImageView showLocation;
    private TextView name, type, address, number, distance;

    String id = "", mapLink = "", distanceKm = "";
    String latitude = "", longitude = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_hospital_details_view);

        Intent intentThis = getIntent();
        id = intentThis.getStringExtra("id");
        latitude = intentThis.getStringExtra("latitude");
        longitude = intentThis.getStringExtra("longitude");
        distanceKm = intentThis.getStringExtra("distance");

        btnBooking = (Button) this.findViewById(R.id.btnBooking);
        showLocation = (ImageView) this.findViewById(R.id.showLocation);

        name = (TextView) this.findViewById(R.id.name);
        type = (TextView) this.findViewById(R.id.type);
        address = (TextView) this.findViewById(R.id.address);
        number = (TextView) this.findViewById(R.id.number);
        distance = (TextView) this.findViewById(R.id.distance);

        showDetails();

        number.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                String strNumber = number.getText().toString();
                makeCall(strNumber);

            }
        });

        showLocation.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if (!mapLink.equals("")) {
                    openBrowser(mapLink);
                }

            }
        });

        btnBooking.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(HospitalDetailsViewActivity.this, AddBookingActivity.class);
                intent.putExtra("hospitalId", id);
                intent.putExtra("latitude", latitude);
                intent.putExtra("longitude", longitude);
                startActivity(intent);
            }
        });

    }

    //    Function for show department branch details
    private void showDetails() {

        String URL = API.HOSPITALS_API + "/" + id;

        RequestQueue requestQueue = Volley.newRequestQueue(HospitalDetailsViewActivity.this);
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(
                Request.Method.GET,
                URL,
                null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {

                        try {
                            String strName = (String) response.getString("name");
                            String strType = (String) response.getString("type");
                            String strAddress = (String) response.getString("address");
                            String strNumber = (String) response.getString("tpNumber");
                            String mapUrl = (String) response.getString("mapUrl");

                            mapLink = mapUrl;

                            name.setText(strName);
                            type.setText(strType);
                            address.setText(strAddress);
                            number.setText(strNumber);
                            distance.setText(distanceKm);

                        } catch (JSONException e) {
                            Toast.makeText(HospitalDetailsViewActivity.this, "Some error occur.",Toast.LENGTH_SHORT).show();
                        }

                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(HospitalDetailsViewActivity.this, error.toString(),Toast.LENGTH_SHORT).show();
                    }
                }

        );

        requestQueue.add(jsonObjectRequest);

    }

    //    Method for make phone call
    private void makeCall(String number)
    {
        Intent callIntent = new Intent(Intent.ACTION_DIAL);
        callIntent.setData(Uri.parse("tel:"+number));
        startActivity(callIntent);
    }

    private void openBrowser(String link)
    {
        Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(link));
        startActivity(browserIntent);
    }

}
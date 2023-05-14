package com.example.epicambulance.Ambulance;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.LinearLayout;

import com.example.epicambulance.Classes.Preferences;
import com.example.epicambulance.MainActivity;
import com.example.epicambulance.R;
import com.example.epicambulance.User.BookingsActivity;
import com.example.epicambulance.User.DashboardActivity;
import com.example.epicambulance.User.HospitalsActivity;
import com.example.epicambulance.User.ProfileActivity;

public class AmbulanceDashboardActivity extends AppCompatActivity {

    private LinearLayout btnHospitals, btnBookings, btnProfile, btnLogout;

    private SharedPreferences sharedPreferences;
    private SharedPreferences.Editor editor;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ambulance_dashboard);

        btnHospitals = (LinearLayout) this.findViewById(R.id.btnHospitals);
        btnBookings = (LinearLayout) this.findViewById(R.id.btnBookings);
        btnProfile = (LinearLayout) this.findViewById(R.id.btnProfile);
        btnLogout = (LinearLayout) this.findViewById(R.id.btnLogout);

//        For shared preferences
        sharedPreferences = getSharedPreferences("Login", MODE_PRIVATE);
        editor = sharedPreferences.edit();

        btnHospitals.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(AmbulanceDashboardActivity.this, HospitalsActivity.class);
                startActivity(intent);

            }
        });

        btnBookings.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(AmbulanceDashboardActivity.this, AmbulanceBookingsActivity.class);
                startActivity(intent);

            }
        });

        btnProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(AmbulanceDashboardActivity.this, AmbulanceProfileActivity.class);
                startActivity(intent);

            }
        });

        btnLogout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Preferences.LOGGED_USER_ID = "";
                Preferences.LOGGED_USER_NAME = "";
                Preferences.LOGGED_USER_TYPE = "";

                editor.clear();
                editor.apply();

                Intent intent = new Intent(AmbulanceDashboardActivity.this, MainActivity.class);
                startActivity(intent);
                finishAffinity();

            }
        });

    }
}
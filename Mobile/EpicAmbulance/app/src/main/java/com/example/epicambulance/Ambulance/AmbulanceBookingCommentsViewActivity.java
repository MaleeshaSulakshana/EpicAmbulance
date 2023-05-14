package com.example.epicambulance.Ambulance;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.example.epicambulance.Classes.API;
import com.example.epicambulance.Classes.Preferences;
import com.example.epicambulance.R;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;

public class AmbulanceBookingCommentsViewActivity extends AppCompatActivity {

    private ListView listView;
    private ArrayList<Comment> detailsArrayList = new ArrayList<>();

    String bookingId = "", status = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ambulance_booking_comments_view);

        Intent project = getIntent();
        bookingId = project.getStringExtra("id");

        listView = (ListView) findViewById(R.id.listView);

        showDetails();

    }

    private void showDetails()
    {
        detailsArrayList.clear();
        listView.setAdapter(null);

        CommentAdapter commentAdapter = new CommentAdapter(this, R.layout.row_booking_comment_item, detailsArrayList);
        listView.setAdapter(commentAdapter);

        String URL = API.BOOKING_COMMENTS_API + "/booking/" + bookingId;

        RequestQueue requestQueue = Volley.newRequestQueue(AmbulanceBookingCommentsViewActivity.this);
        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(
                Request.Method.GET,
                URL,
                null,
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {

                        try {

                            for (int index = 0; index < response.length(); index++) {

                                JSONObject responseData = response.getJSONObject(index);

                                String id = (String) responseData.getString("id");
                                String comment = (String) responseData.getString("commentDetails");

                                detailsArrayList.add(new Comment(id, comment));

                            }

                            commentAdapter.notifyDataSetChanged();

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(AmbulanceBookingCommentsViewActivity.this, error.toString(),Toast.LENGTH_SHORT).show();
                    }
                }

        );

        requestQueue.add(jsonArrayRequest);

    }

}


class Comment {

    String id, comment;

    public Comment(String id, String comment) {
        this.id = id;
        this.comment = comment;
    }

    public String getId() {
        return id;
    }

    public String getComment() {
        return comment;
    }
}

class CommentAdapter extends ArrayAdapter<Comment> {

    private Context mContext;
    private int mResource;

    public CommentAdapter(@NonNull Context context, int resource, @NonNull ArrayList<Comment> objects) {
        super(context, resource, objects);

        this.mContext = context;
        this.mResource = resource;
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        LayoutInflater layoutInflater = LayoutInflater.from(mContext);
        convertView = layoutInflater.inflate(mResource, parent, false);

        TextView comment = (TextView) convertView.findViewById(R.id.comment);

        comment.setText(getItem(position).getComment());

        return convertView;
    }

}
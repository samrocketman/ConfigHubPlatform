/*
 * Copyright (c) 2016 ConfigHub, LLC to present - All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

package com.confighub.api.repository.user.team;

import com.confighub.api.repository.user.AUserAccessValidation;
import com.confighub.api.server.AuthenticationNotRequired;
import com.confighub.api.util.GsonHelper;
import com.confighub.core.store.Store;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/getTeams")
public class GetTeams
        extends AUserAccessValidation
{
    @AuthenticationNotRequired
    @GET
    @Path("/{account}/{repository}")
    @Produces("application/json")
    public Response get(@PathParam("account") String account,
                        @PathParam("repository") String repositoryName,
                        @HeaderParam("Authorization") String token)
    {
        Store store = new Store();

        try
        {
            int status = validate(account, repositoryName, token, store);
            if (0 != status) return Response.status(status).build();

            JsonObject json = new JsonObject();
            json.add("teams", GsonHelper.getTeams(repository.getTeams()));
            json.addProperty("accessControlEnabled", repository.isAccessControlEnabled());

            Gson gson = new Gson();
            return Response.ok(gson.toJson(json), MediaType.APPLICATION_JSON).build();
        }
        finally
        {
            store.close();
        }
    }
}

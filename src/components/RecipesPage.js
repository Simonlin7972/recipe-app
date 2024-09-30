import React from 'react';
import { Container, Typography, Box, Paper, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import recipes from '../recipes.json';

function RecipesPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="left" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          食譜列表
        </Typography>
        <Grid container spacing={2}>
          {Object.keys(recipes).map((recipeName) => (
            <Grid item xs={6} key={recipeName}>
              <Card>
                <CardActionArea component={Link} to={`/recipe/${recipeName}`}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {recipeName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      熱量: {recipes[recipeName].預估熱量} 卡路里
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}

export default RecipesPage;
package ma.projet.graph.config;

import graphql.schema.GraphQLScalarType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GraphQLConfig {

    @Bean
    public GraphQLScalarType longScalar() {
        return GraphQLScalarType.newScalar()
                .name("Long")
                .description("Custom scalar type for Long")
                .coercing(new graphql.schema.Coercing<Long, Long>() {
                    @Override
                    public Long serialize(Object dataFetcherResult) {
                        return (Long) dataFetcherResult;
                    }

                    @Override
                    public Long parseValue(Object input) {
                        return Long.parseLong(input.toString());
                    }

                    @Override
                    public Long parseLiteral(Object input) {
                        return Long.parseLong(input.toString());
                    }
                }).build();
    }
}
